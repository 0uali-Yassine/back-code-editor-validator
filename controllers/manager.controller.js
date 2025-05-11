const Page = require('../models/page.model');
const Section = require('../models/section.model');
const Code = require('../models/code.model');
const User = require('../models/user.model');

const getAllStudentCodes = async (req, res) => {
  try {
    const pageId = '681fa4237c539c3f47380151'; // Replace with dynamic ID if needed
    const page = await Page.findById(pageId);
    const sections = await Section.find({ pageId });
    const users = await User.find({ role: 'student' }, '-password');

    const allCodes = await Code.find({ pageId }).populate('userId', 'name email'); // You can populate name/email

    // const sectionMap = {};
    // sections.forEach(section => {
    //   sectionMap[section._id.toString()] = section.title || section._id;
    // });

    // const formatted = allCodes.map(code => ({
    //   user: code.userId, // will include name/email if populated
    //   section: sectionMap[code.sectionId.toString()],
    //   code: code.code,
    //   isCorrect: code.isCorrect,
    // }));

    res.status(200).json({ page, sections,users,allCodes });
  } catch (err) {
    console.error('Manager fetching student codes error:', err);
    res.status(500).json({ error: 'Could not fetch student codes' });
  }
};

module.exports = {getAllStudentCodes};