const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false, required: true },
    password: { type: String, required: true },
    resume: { type: mongoose.SchemaTypes.ObjectId, ref: "Resume" },
    isResumeFile: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
