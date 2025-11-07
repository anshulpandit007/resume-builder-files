const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Resume = require("../models/resumeModel");

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Add All Fields!");
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exist!");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const resume = await Resume.create({
        intro: {
            name,
            email,
        },
    });
    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        resume: resume._id,
    });

    if (user) {
        const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            resume:user.resume,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = {
    registerUser,
    loginUser,
};
