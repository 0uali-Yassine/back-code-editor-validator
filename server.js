const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// const connectDB = require("./config/db");




// module
const User = require('./models/user.model');
const Code = require('./models/code.model');

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

// app.post('/api/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if(!name || !email || !password){
//         res.status(400).json({message:"Please remplair All the fields"});

//     }
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashed });
//     await user.save();
//     res.json({ message: 'User registered' });
    
//   } catch (error) {
//     console.log(message.error);
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: 'User not found' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign(
//     { userId: user._id }, 
//     '134559038',
//     { expiresIn: '24h' }
// );
//   res.json({ token, user });
// });



// app.post('/api/save-code', auth, async (req, res) => {
//     const { code } = req.body;
//     try {
//       const updated = await Code.findOneAndUpdate(
//         { studentId: req.user.userId }, 
//         { code },                        
//         { upsert: true, new: true }     // create if not exists, return updated doc
//       );
  
//       res.json({ message: 'Code saved/updated', data: updated });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
// });

app.use('/api',saveCodeRoutes);
app.use('/api',studentCodeRoutes);

// app.get('/api/student/code', auth, async (req, res) => {
//     try {
//       const studentId = req.user.userId;
//       const code = await Code.findOne({ studentId });
  
//       if (!code) {
//         return res.status(404).json({ message: 'No code found for this student!' });
//       }
  
//       return res.status(200).json({ code:code.code });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error' });
//     }
// });

app.listen(3000, () => console.log('Backend running on port 3000'));



