// Load Problem model
const Problem = require('../models/problem');
const { validateProblemModel } = require('../validation/model');

// @route   GET api/problems
// @desc    Get All Problems
// @access  Public
exports.getAllProblems = async (req, res) => {
    const problems = await Problem.find();
    return res.json(problems);
}

// @route   POST api/problems
// @desc    Add Problem
// @access  Public
exports.addProblem = async (req, res) => {
    try {
        const { problem } = req.body;
        const { errors, isValid } = validateProblemModel(problem);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newProblem = new Problem(problem);
        await newProblem.save();
        return res.json({ success: true });
    } catch (error) {
        console.error('Error updating collection:', error);
    }
}

// @route   PUT api/problems
// @desc    Update Problem
// @access  Public
exports.updateProblem = async (req, res) => {
    try {
        const { problem } = req.body;
        const { inputNumericalValue, inputUnitOfMeasure, targetUnitOfMeasure, studentResponse } = problem;
        const { errors, isValid } = validateProblemModel(problem);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const origin = await Problem.findById(problem._id);
        origin.inputNumericalValue = inputNumericalValue;
        origin.inputUnitOfMeasure = inputUnitOfMeasure;
        origin.targetUnitOfMeasure = targetUnitOfMeasure;
        origin.studentResponse = studentResponse;
        await origin.save();
        return res.json({ success: true });
    } catch (error) {
        console.error('Error updating collection:', error);
    }
}

// @route   DELETE api/problems/:problemId
// @desc    Remove Problem
// @access  Public
exports.removeProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        await Problem.deleteOne({ _id: problemId });
        return res.json({ success: true });
    } catch (error) {
        console.error('Error updating collection:', error);
    }
}