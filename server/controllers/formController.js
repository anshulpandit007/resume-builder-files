const asyncHandler = require("express-async-handler");
const Resume = require("../models/resumeModel");
const User = require("../models/userModel");

const introSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { intro: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const eduSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { edu: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const expSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { exp: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const projectsSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { projects: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const achSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { ach: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const skillsSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { skills: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const profilesSubmit = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            req.user.resume,
            { profiles: req.body },
            { new: true }
        );

        res.send(resume);
    } catch (e) {
        throw new Error(e.message);
    }
});

const introSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.intro);
    } catch (e) {
        throw new Error(e.message);
    }
});

const eduSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.edu);
    } catch (e) {
        throw new Error(e.message);
    }
});

const expSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.exp);
    } catch (e) {
        throw new Error(e.message);
    }
});

const projectsSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.projects);
    } catch (e) {
        throw new Error(e.message);
    }
});

const achSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.ach);
    } catch (e) {
        throw new Error(e.message);
    }
});

const skillsSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.skills);
    } catch (e) {
        throw new Error(e.message);
    }
});

const profilesSubmitGet = asyncHandler(async (req, res) => {
    try {
        const resume = await Resume.findById(req.user.resume);

        res.send(resume.profiles);
    } catch (e) {
        throw new Error(e.message);
    }
});

module.exports = {
    introSubmit,
    eduSubmit,
    expSubmit,
    projectsSubmit,
    achSubmit,
    skillsSubmit,
    profilesSubmit,

    introSubmitGet,
    eduSubmitGet,
    expSubmitGet,
    projectsSubmitGet,
    achSubmitGet,
    skillsSubmitGet,
    profilesSubmitGet,
};
