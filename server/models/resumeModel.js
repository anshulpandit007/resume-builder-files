const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mob_num: String,
    portfolio_link: String,
    linkedin: String,
    github: String,
});

const eduSchema = new mongoose.Schema({
    clg_name: String,
    clg_location: String,
    clg_degree: String,
    clg_major: String,
    clg_cgpa: String,
    clg_start_date: String,
    clg_end_date: String,
});

const expSchema = new mongoose.Schema({
    company_name: String,
    job_title: String,
    job_location: String,
    job_start_date: String,
    job_end_date: String,
    job_desc: [String],
});

const projectsSchema = new mongoose.Schema({
    project_name: String,
    project_link: String,
    project_github: String,
    project_desc: [String],
});

const achSchema = new mongoose.Schema({
    ach_text: String,
    ach_link: String,
});

const skillsSchema = new mongoose.Schema({
    skill_title: String,
    skill_text: String,
});

const profilesSchema = new mongoose.Schema({
    profile_link: String,
    profile_about: String,
});

const resumeSchema = new mongoose.Schema({
    intro: { type: introSchema, required: true },
    edu: { type: [eduSchema] },
    exp: { type: [expSchema] },
    projects: { type: [projectsSchema] },
    ach: { type: [achSchema] },
    skills: { type: [skillsSchema] },
    profiles: { type: [profilesSchema] },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
