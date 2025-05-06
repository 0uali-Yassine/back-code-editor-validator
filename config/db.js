const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://codecraftcademy:H7AtpHV67J2puxWq@code-editor-validator.pe9tdoa.mongodb.net/?retryWrites=true&w=majority&appName=code-editor-validator');
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
