const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/', answerController.getAllAnswers);
router.post('/', answerController.checkAnswer);

module.exports = router;