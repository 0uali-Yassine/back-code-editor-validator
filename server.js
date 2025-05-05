const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://codecraftcademy:H7AtpHV67J2puxWq@code-editor-validator.pe9tdoa.mongodb.net/?retryWrites=true&w=majority&appName=code-editor-validator')
    .then(r => console.log('mongodb Connected...')) 

// Mongoose schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const codeSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  code: String,
  savedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Code = mongoose.model('Code', codeSchema);

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400).json({message:"Please remplair All the fields"});

    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: '✅ User registered' });
    
  } catch (error) {
    console.log(message.error);
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id }, 
    '134559038',
    { expiresIn: '24h' }
);
  res.json({ token, user });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, '134559038');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/save-code', auth, async (req, res) => {
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
});


app.get('/api/student/code', auth, async (req, res) => {
    try {
      const studentId = req.user.userId;
      const code = await Code.findOne({ studentId });
  
      if (!code) {
        return res.status(404).json({ message: 'No code found for this student!' });
      }
  
      return res.status(200).json({ code:code.code });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, () => console.log('Backend running on port 3000'));



