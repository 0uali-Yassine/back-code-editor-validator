const Code = require("../models/code.model");

const saveCode = async (req, res) => {
    const { code } = req.body;
    try {
      const updated = await Code.findOneAndUpdate(
        { studentId: req.user.userId }, 
        { code },                        
        { upsert: true, new: true }     // create if not exists, return updated doc
      );
  
      res.json({ message: 'Code saved/updated', data: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {saveCode};