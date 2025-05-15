const Code = require("../models/code.model");
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const saveAndCheckCode =  async (req, res) => {
    const { code, exercise, userId, pageId, sectionId} = req.body;
    console.log(exercise);
    console.log(code);
  
    // const prompt = `
    //   You are a coding mentor. Please check if the following code solves the following exercise:
    //   Exercise: ${exercise}
    //   Code: ${code}
    //   Respond with only one of the following:
    //   - CORRECT (if solution is 50% or more correct)
    //   - INCORRECT (if it fails to meet the requirement)
    //   - ERROR (if code has syntax or runtime errors)
    // `;

    const prompt = `
You are a strict Python code evaluator. Check if the following code fully and correctly solves the exercise below:

Exercise:
${exercise}

Student Code:
${code}

Rules:
- Only reply with EXACTLY one word: CORRECT, INCORRECT, or ERROR.
- CORRECT: Only if the solution is 100% logically accurate and complete.
- INCORRECT: If the logic is wrong, incomplete, or does not solve the problem correctly.
- ERROR: If there is any syntax or runtime error in the code.

Respond ONLY with one word: CORRECT, INCORRECT, or ERROR.
`;
  
    

  
    const data = {
      contents: [{ parts: [{ text: prompt }] }]
    };
  
    try {
  
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      const feedback = response.data.candidates[0].content.parts[0].text.trim().toUpperCase();
      console.log('feedback:', feedback);

      const VALID_RESPONSES = {
        CORRECT: 'Correct',
        INCORRECT: 'Incorrect',
        ERROR: 'SyntaxError'
      };

      const cleanFeedback = feedback.replace(/[\s\n]+/g, '');
      const isCorrect = VALID_RESPONSES[cleanFeedback] || 'Unknown';
      console.log('Evaluation result:', isCorrect);

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
      console.log(savedCode);
      
    } catch (error) {
      console.error('Code check failed:', error);
      res.status(500).json({ error: 'Failed to check code', details: error.response?.data || error.message });
    }
}

module.exports = {saveAndCheckCode};
