require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');


const signUp = async (req, res) => {
    try {
      const { name, email, password , role } = req.body;

      if(!name || !email || !password){
          return res.status(400).json({message:"Please remplair All the fields"});

      }
      const isExist = await User.findOne({ email });
      if (isExist) return res.status(401).json({ message: 'User Already Exist!' });

      const hashed = await bcrypt.hash(password, 10);

      const user = new User({ name, email, password: hashed ,role});
      const userData = await user.save();

      return res.status(200).json({status : true ,data :  userData});
      
    } catch (error) {
      res.status(500);
    }

}

const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id , role:user.role }, 
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);
  console.log(token);
  res.json({ token, user });
}

module.exports = {signUp,Login}