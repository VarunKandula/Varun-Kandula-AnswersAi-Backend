const Question = require('../models/question.model');
const aiService = require('../services/ai.service');

class QuestionController {
  async submitQuestion(req, res) {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: 'Question content is required' });
      }

      // Create question record
      const question = new Question({
        content,
        userId: req.user?.id || 'anonymous', // We'll update this when auth is added
        status: 'pending'
      });

      // Generate answer using AI service
      try {
        const { answer, metadata } = await aiService.generateAnswer(content);
        
        question.answer = answer;
        question.status = 'completed';
        question.processingTime = metadata.processingTime;
        question.metadata = metadata;
      } catch (error) {
        question.status = 'failed';
        throw error;
      }

      // Save question with answer
      await question.save();

      return res.status(201).json({
        id: question._id,
        content: question.content,
        answer: question.answer,
        status: question.status,
        createdAt: question.createdAt
      });
    } catch (error) {
      console.error('Question submission error:', error);
      return res.status(500).json({ 
        message: 'Failed to process question',
        error: error.message 
      });
    }
  }

  async getQuestion(req, res) {
    try {
      const { questionId } = req.params;
      
      const question = await Question.findById(questionId);
      
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }

      // Later we'll add user verification here
      
      return res.json({
        id: question._id,
        content: question.content,
        answer: question.answer,
        status: question.status,
        createdAt: question.createdAt,
        metadata: question.metadata
      });
    } catch (error) {
      console.error('Question retrieval error:', error);
      return res.status(500).json({ 
        message: 'Failed to retrieve question',
        error: error.message 
      });
    }
  }

  async getUserQuestions(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const questions = await Question.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Question.countDocuments({ userId });

      return res.json({
        questions,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      console.error('User questions retrieval error:', error);
      return res.status(500).json({ 
        message: 'Failed to retrieve user questions',
        error: error.message 
      });
    }
  }
}

module.exports = new QuestionController();
