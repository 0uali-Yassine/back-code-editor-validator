const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  code: String,
  savedAt: { type: Date, default: Date.now },
});
const Code = mongoose.model('Code', codeSchema);


module.exports = Code;