const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  processingTime: {
    type: Number  // Time taken to generate answer in milliseconds
  },
  metadata: {
    model: String,  // AI model used
    tokens: Number, // Number of tokens used
    cost: Number    // Cost of the API call (if applicable)
  }
}, {
  timestamps: true
});

// Index for faster queries
questionSchema.index({ userId: 1, createdAt: -1 });
questionSchema.index({ status: 1 });

module.exports = mongoose.model('Question', questionSchema);
