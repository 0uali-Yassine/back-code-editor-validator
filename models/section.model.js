const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page'
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['lecture', 'exercise', 'quiz']
  }
}, {
  timestamps: true
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;