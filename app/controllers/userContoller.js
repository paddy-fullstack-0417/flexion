const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/key');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/user');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
exports.registerUser = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
    } else {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const user = await newUser.save();
        return res.json(user);
    }
}

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
exports.loginUser = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    const user = await User.findOne({ email });
    // Check for user
    if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // User Matched
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }; // Create JWT Payload

        // Sign Token
        const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
        return res.json({
            success: true,
            token: 'Bearer ' + token
        });
    } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
    }
};

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
exports.currentUser = (req, res) => {
    return res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    });
};

// @route   GET api/users
// @desc    Return all users
// @access  Public
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users.map(user => ({
        ...user._doc,
        password: undefined
    })));
};