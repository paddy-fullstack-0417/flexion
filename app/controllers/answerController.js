// Load Answer model
const Answer = require('../models/answer');
// Load Problem model
const Problem = require('../models/problem');

const { checkAnswer } = require('../utils/check-answer');

// @route   GET api/answers
// @desc    Get All Answers
// @access  Public
exports.getAllAnswers = async (req, res) => {
    const answers = await Answer.find();
    return res.json(answers);
}

// @route   GET api/answers/:userId
// @desc    Get Answer by UserID
// @access  Public
exports.getAnswer = async (req, res) => {
    const { userId } = req.params;
    const { answer } = await Answer.find({ user: userId });
    return res.json(answer);
}

// @route   POST api/answers
// @desc    Check Answer and Store in Database
// @access  Public
exports.checkAnswer = async (req, res) => {
    const { userId, answer } = req.body;
    const problem = await Problem.find();
    const checkedAnswer = checkAnswer(problem, answer);
    const newAnswer = new Answer({ user: userId, answer: checkedAnswer });
    await newAnswer.save();
    return res.json(checkedAnswer);
}