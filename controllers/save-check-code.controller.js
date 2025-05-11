const Code = require("../models/code.model");
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const saveAndCheckCode =  async (req, res) => {
    const { code, exercise, userId, pageId, sectionId} = req.body;
  
    const prompt = `
      You are a coding mentor. Please check if the following code solves the following exercise:
      Exercise: ${exercise}
      Code: ${code}
      Respond with only one of the following:
      - CORRECT (if solution is 50% or more correct)
      - INCORRECT (if it fails to meet the requirement)
      - ERROR (if code has syntax or runtime errors)
    `;
  
    const data = {
      contents: [{ parts: [{ text: prompt }] }]
    };
  
    try {
  
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      const feedback = response.data.candidates[0].content.parts[0].text.trim().toUpperCase();
  
      let isCorrect;
      if (feedback.includes('CORRECT')) isCorrect = 'Correct';
      else if (feedback.includes('INCORRECT')) isCorrect = 'Incorrect';
      else if (feedback.includes('ERROR')) isCorrect = 'SyntaxError';
      else isCorrect = 'pending'; // fallback
  
      const savedCode = await Code.findOneAndUpdate(
          { userId, pageId, sectionId },
          {
            $set: {
              code,
              isCorrect,
              userId,    
              pageId,
              sectionId
            }
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
  
      res.json({ message: 'Code saved and evaluated.', result: savedCode });
      
    } catch (error) {
      console.error('Code check failed:', error);
      res.status(500).json({ error: 'Failed to check code', details: error.response?.data || error.message });
    }
}

module.exports = {saveAndCheckCode};
