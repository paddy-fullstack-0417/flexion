const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/', problemController.getAllProblems);
router.post('/', problemController.addProblem);
router.put('/', problemController.updateProblem);
router.delete('/:problemId', problemController.removeProblem);

module.exports = router;