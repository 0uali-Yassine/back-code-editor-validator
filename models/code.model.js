const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page'
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  code: {
    type: String,
    default: ''
  },
  isCorrect: {
    type: String,
    enum: ['correct', 'incorrect', 'syntaxError', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Code = mongoose.model('Code', codeSchema);
module.exports = Code;