const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// const connectDB = require("./config/db");




// module
const User = require('./models/user.model');
const Code = require('./models/code.model');
const Page = require('./models/page.model');

// middleware auth

const auth = require('./middleware/auth');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://codecraftcademy:H7AtpHV67J2puxWq@code-editor-validator.pe9tdoa.mongodb.net/?retryWrites=true&w=majority&appName=code-editor-validator')
    .then(() => console.log('mongodb Connected...')) 

// connectDB();



const authRoutes = require('./routes/auth.routes');
const saveCodeRoutes = require('./routes/save-code.routes');
const studentCodeRoutes = require('./routes/student-code.routes');

app.use('/api',authRoutes);

// profile

app.get('/api/course/student',async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      res.status(200).json({user});

    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching profile', 
        error: error.message 
      });
    }
});


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

app.use('/api',saveCodeRoutes);
app.use('/api',studentCodeRoutes);



app.listen(3000, () => console.log('Backend running on port 3000'));



