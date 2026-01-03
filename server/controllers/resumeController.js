const asyncHandler = require("express-async-handler");
const Resume = require("../models/resumeModel");
const User = require("../models/userModel");
const { headerTex } = require("./tex/headerTex");
const { getIntroTex } = require("./tex/introTex");
const { getEduTex } = require("./tex/eduTex");
const { getExpTex } = require("./tex/expTex");
const { getProjectsTex } = require("./tex/projectsTex");
const { getAchTex } = require("./tex/achTex");
const { getSkillsTex } = require("./tex/skillsTex");
const { getProfilesTex } = require("./tex/profilesTex");
const { footerTex } = require("./tex/footerTex");
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const axios = require("axios");

// Utility to validate LaTeX content
const validateLatexContent = (latexContent) => {
    if (!latexContent) return { isValid: false, message: "LaTeX content is empty" };

    // Check for basic LaTeX structure
    const hasDocClass = latexContent.includes("\\documentclass");
    const hasBeginDoc = latexContent.includes("\\begin{document}");
    const hasEndDoc = latexContent.includes("\\end{document}");

    if (!hasDocClass || !hasBeginDoc || !hasEndDoc) {
        return {
            isValid: false,
            message: "Missing required LaTeX structure (\\documentclass, \\begin{document}, or \\end{document})",
        };
    }

    return { isValid: true, message: "LaTeX content is valid" };
};

// Utility to get GitHub SHA
const getSHA = async (user_id) => {
    const PATH = `${user_id}.tex`;
    const config = {
        method: "get",
        url: `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}`,
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
    };

    try {
        const res = await axios(config);
        return res.data.sha;
    } catch (e) {
        console.log("Error fetching GitHub SHA:", e.message);
        throw new Error("Failed to fetch GitHub SHA: " + e.message);
    }
};

// Utility to create GitHub file
const createGithubFile = async (user_id, resume) => {
    const content = Buffer.from(resume).toString("base64");
    const data = JSON.stringify({
        message: "File Created Successfully!",
        content: content,
    });

    const PATH = `${user_id}.tex`;
    const config = {
        method: "put",
        url: `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}`,
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const res = await axios(config);
        console.log("GitHub file created successfully:", res.data.content.name);
    } catch (e) {
        console.log("Error creating GitHub file:", e.message);
        throw new Error("Failed to create GitHub file: " + e.message);
    }
};

// Utility to update GitHub file
const updateGithubFile = async (user_id, resume) => {
    const shaGithubFile = await getSHA(user_id);
    const content = Buffer.from(resume).toString("base64");

    const data = JSON.stringify({
        message: "File Updated!",
        content: content,
        sha: shaGithubFile,
    });

    const PATH = `${user_id}.tex`;
    const config = {
        method: "put",
        url: `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}`,
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const res = await axios(config);
        console.log("GitHub file updated successfully:", res.data.content.name);
    } catch (e) {
        console.log("Error updating GitHub file:", e.message);
        throw new Error("Failed to update GitHub file: " + e.message);
    }
};


const getResume = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    console.log("User ID:", user._id, "Resume ID:", user.resume);

    if (!user.resume) {
      console.log("No resume ID found for user");
      return res.status(400).json({ error: "No resume ID found for user" });
    }

    const resume = await Resume.findById(user.resume);
    if (!resume) {
      console.log("Resume not found in database for ID:", user.resume);
      return res.status(404).json({ error: "Resume not found in database" });
    }

    // build latex tex
    const introTex = getIntroTex(resume.intro || {});
    const eduTex = getEduTex(resume.edu || []);
    const expTex = getExpTex(resume.exp || []);
    const projectsTex = getProjectsTex(resume.projects || []);
    const achTex = getAchTex(resume.ach || []);
    const skillsTex = getSkillsTex(resume.skills || []);
    const profilesTex = getProfilesTex(resume.profiles || []);
    const resumeTex =
      headerTex +
      introTex +
      eduTex +
      expTex +
      projectsTex +
      achTex +
      skillsTex +
      profilesTex +
      footerTex;

    // validate LaTeX minimal structure
    const validation = validateLatexContent(resumeTex);
    if (!validation.isValid) {
      console.error("Invalid LaTeX content:", validation.message);
      return res.status(400).json({ error: "Invalid LaTeX content", details: validation.message });
    }

    // upload or update GitHub file
    try {
      if (req.user.isResumeFile) {
        await updateGithubFile(req.user._id, resumeTex);
      } else {
        await createGithubFile(req.user._id, resumeTex);
        await User.findOneAndUpdate({ _id: req.user._id }, { isResumeFile: true }, { new: true });
      }
    } catch (gitErr) {
      console.error("GitHub upload error:", gitErr.message || gitErr);
      return res.status(500).json({ error: "GitHub upload failed", details: (gitErr.message || String(gitErr)) });
    }

    // call latexonline to compile from the repo
    const compileUrl = `https://latexonline.cc/compile?git=https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}&target=${req.user._id}.tex&command=pdflatex`;
    console.log("Fetching compilation from:", compileUrl);

    let compileResponse;
    try {
      compileResponse = await axios.get(compileUrl, { responseType: "arraybuffer", timeout: 120000 });
    } catch (e) {
      console.error("Error fetching from latexonline.cc:", e.message || e);
      return res.status(502).json({ error: "Failed to fetch compilation result", details: e.message || String(e) });
    }

    // check headers + raw bytes for PDF magic
    const headers = compileResponse.headers || {};
    const contentType = (headers["content-type"] || headers["Content-Type"] || "").toLowerCase();
    const rawBuffer = Buffer.from(compileResponse.data || []);
    let isPDF = false;

    try {
      if (contentType.includes("pdf") || contentType === "application/octet-stream") {
        // may still be PDF
        if (rawBuffer.length >= 4 && rawBuffer.slice(0, 4).toString() === "%PDF") isPDF = true;
      } else {
        // sometimes latexonline returns actual PDF but content-type missing; check magic bytes anyway
        if (rawBuffer.length >= 4 && rawBuffer.slice(0, 4).toString() === "%PDF") isPDF = true;
      }
    } catch (e) {
      console.error("PDF detection check failed:", e.message || e);
    }

    if (isPDF) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="resume_${req.user._id}.pdf"`);
      return res.send(rawBuffer);
    }

    // NOT a PDF -> try to parse as text or JSON to show error details
    let textResp = "";
    try {
      textResp = rawBuffer.toString("utf8");
    } catch (e) {
      textResp = "";
    }

    // if it looks like JSON, parse and forward status
    try {
      const parsed = JSON.parse(textResp);
      // if parsed has status & download fields like latexonline format
      if (parsed && parsed.status === "success" && parsed.download) {
        return res.json({ pdfUrl: parsed.download });
      } else {
        console.error("latexonline returned JSON error:", parsed);
        return res.status(500).json({ error: "LaTeX compilation returned error", details: parsed || textResp });
      }
    } catch (jsonErr) {
      // not JSON — return the raw text (likely HTML log or error)
      console.error("latexonline returned non-pdf response (text/html). Length:", textResp.length);
      return res.status(500).json({
        error: "LaTeX compilation did not return a PDF",
        details: textResp.substring(0, 1500), // send limited logs to avoid huge payload
      });
    }
  } catch (e) {
    console.error("Resume generation error:", e.message || e);
    return res.status(500).json({ error: "Failed to generate resume", details: (e.message || String(e)) });
  }
});
const getLatexCode = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const resume = await Resume.findById(user.resume);

        if (!resume) {
            return res.status(404).json({ error: "Resume not found in database" });
        }

        const introTex = getIntroTex(resume.intro || {});
        const eduTex = getEduTex(resume.edu || []);
        const expTex = getExpTex(resume.exp || []);
        const projectsTex = getProjectsTex(resume.projects || []);
        const achTex = getAchTex(resume.ach || []);
        const skillsTex = getSkillsTex(resume.skills || []);
        const profilesTex = getProfilesTex(resume.profiles || []);
        const resumeTex =
            headerTex +
            introTex +
            eduTex +
            expTex +
            projectsTex +
            achTex +
            skillsTex +
            profilesTex +
            footerTex;

        // Validate the generated LaTeX content
        const validation = validateLatexContent(resumeTex);
        if (!validation.isValid) {
            console.error("Invalid LaTeX content:", validation.message);
            return res.status(400).json({ error: "Invalid LaTeX content", details: validation.message });
        }

        res.send(resumeTex);
    } catch (e) {
        res.status(500).json({ error: "Failed to get LaTeX code", details: e.message });
    }
});

module.exports = {
    getResume,
    getLatexCode,
};