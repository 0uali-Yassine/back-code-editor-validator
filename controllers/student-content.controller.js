const Code = require("../models/code.model");
const Page = require("../models/page.model");
const Section = require("../models/section.model");

const studentContent = async (req, res) => {
    try {
        const user = req.user.userId;
        const pageId = '681fa4237c539c3f47380151'; // just for testing
        console.log(pageId);

        const page = await Page.findById(pageId);
        if (!page) return res.status(404).json({ message: 'Page not found' });

        const sections = await Section.find({ pageId });
        const userCode = await Code.find({ userId: user, pageId: pageId });

        const sectionWithCode = sections
            .filter(section => userCode.some(doc => doc.sectionId.toString() === section._id.toString()))
            .map(section => {
                const codeDoc = userCode.find(doc => doc.sectionId.toString() === section._id.toString());

                return {
                    _id: codeDoc._id,
                    sectionId: section._id,
                    pageId,
                    code: codeDoc.code,
                    isCorrect: codeDoc.isCorrect,
                };
            });

        console.log(sectionWithCode);

        return res.status(201).json({ page, sections, sectionWithCode });


    } catch (error) {
        console.error('Error fetching student content:', error);
        res.status(500).json({ error: 'Failed to load content' });
    }
}

module.exports = {studentContent};