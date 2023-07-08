const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error('MongoDB connection URI not found');
      }
  
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
      console.log(`Mongodb Database Error ${error.message}`.bgRed.white);
    }
  };
  
  module.exports = connectDB;
  