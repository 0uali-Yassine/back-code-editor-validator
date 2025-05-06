const Code = require("../models/code.model");

 const studentCode = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const code = await Code.findOne({ studentId });
  
      if (!code) {
        return res.status(404).json({ message: 'No code found for this student!' });
      }
  
      return res.status(200).json({ code:code.code });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {studentCode};