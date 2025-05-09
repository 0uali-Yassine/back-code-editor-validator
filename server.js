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


app.use('/api',saveCodeRoutes);
app.use('/api',studentCodeRoutes);



app.listen(3000, () => console.log('Backend running on port 3000'));



