const Code = require("../models/code.model");

 const studentCode = async (req, res) => {
    try {
      const studentId = req.user.userId;
      const code = await Code.findOne({ studentId });
  
     
      return res.status(200).json({ code });
  
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {studentCode};