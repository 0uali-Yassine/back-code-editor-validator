const User = require("../models/user.model");

const studentCourse = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      return res.status(200).json({user});

    } catch (error) {
      return res.status(500).json({ 
        message: 'Error fetching profile', 
        error: error.message 
      });
    }
}

module.exports = {studentCourse}