const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require("./config/db");




// module
const User = require('./models/user.model');
const Code = require('./models/code.model');
const Page = require('./models/page.model');
const Section = require('./models/section.model');

// middleware auth

const auth = require('./middleware/auth');


const app = express();
// app.use(cors());
app.use(cors({
    origin: 'http://front-code-editor-validator-next-js.vercel.app',
    credentials: true // Important for cookies
}));
app.use(express.json());


// mongoose.connect('mongodb+srv://codecraftcademy:H7AtpHV67J2puxWq@code-editor-validator.pe9tdoa.mongodb.net/?retryWrites=true&w=majority&appName=code-editor-validator')
//     .then(() => console.log('mongodb Connected...'))

connectDB();



const authRoutes = require('./routes/auth.routes');
const saveCodeRoutes = require('./routes/save-code.routes');
const studentCodeRoutes = require('./routes/student-code.routes');
const studentCourseRoutes = require('./routes/student-course.routes');
const saveCheckCodeRoutes = require('./routes/save-check-code.route');
const studentContentRoutes = require('./routes/student-content.routes');
const managerRoutes = require('./routes/manager.routes');


app.use('/api', authRoutes);

// student-course
app.use('/api/course', studentCourseRoutes);


// save and check code
app.use('/api', saveCheckCodeRoutes);

//get all page,sections,thier code

// if i have multiple pages!!
// app.get('/student-content', auth, role(['student']), async (req, res) => {
//     try {
//       // 1. Get all pages
//       const pages = await Page.find();

//       const result = await Promise.all(pages.map(async (page) => {
//         // 2. Get all sections for the current page
//         const sections = await Section.find({ pageId: page._id });

//         const sectionsWithCode = await Promise.all(
//           sections.map(async (section) => {
//             // 3. Find if student has code for this section
//             const codeDoc = await Code.findOne({
//               userId: req.user._id,
//               pageId: page._id,
//               sectionId: section._id
//             });

//             return {
//               _id: section._id,
//               title: section.title,
//               description: section.description,
//               type: section.type,
//               code: codeDoc?.code || '',
//               isCorrect: codeDoc?.isCorrect || 'pending',
//               hasSubmitted: !!codeDoc
//             };
//           })
//         );

//         return {
//           _id: page._id,
//           title: page.title,
//           sections: sectionsWithCode
//         };
//       }));

//       res.status(200).json(result);
//     } catch (error) {
//       console.error('Error fetching student content:', error);
//       res.status(500).json({ error: 'Failed to load content' });
//     }
// });

// for now i have just one page
app.use('/api',studentContentRoutes);

app.use('/api/manager',managerRoutes);




// just create page 
// app.post('/api/page',async (req, res) => {
//     try {
//       const { title} = req.body;

//       const page = new Page({
//         title,
//       });

//       const createdPage = await page.save();

//       res.status(201).json(createdPage);
//     } catch (error) {
//       res.status(500).json({ 
//         message: 'Error creating page', 
//         error: error.message 
//       });
//     }
// });

// just create section 
// app.post('/api/section',async (req, res) => {
//     try {
//       const { pageId, title, description, type } = req.body;

//       // Verify page exists
//       const page = await Page.findById(pageId);
//       if (!page) {
//         return res.status(404).json({ message: 'Page not found' });
//       }

//       const section = new Section({
//         pageId,
//         title,
//         description,
//         type
//       });

//       const createdSection = await section.save();

//       res.status(201).json(createdSection);

//     } catch (error) {
//       res.status(500).json({ 
//         message: 'Error creating section', 
//         error: error.message 
//       });
//     }
// });



app.use('/api', saveCodeRoutes);
app.use('/api', studentCodeRoutes);



app.listen(3000, () => console.log('Backend running on port 3000'));



