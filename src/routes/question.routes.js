const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

// Submit a new question
router.post('/', questionController.submitQuestion);

// Get a specific question
router.get('/:questionId', questionController.getQuestion);

// Get all questions for a user
router.get('/user/:userId', questionController.getUserQuestions);

module.exports = router;
