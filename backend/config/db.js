const mongoose = require('mongoose');

const connectDB = async () => {
  const useMongoDB = process.env.USE_MONGODB === 'true';
  
  if (useMongoDB) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-kids-labs', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log('Using JSON file for data storage (Development/Mock Mode)');
  }
};

module.exports = connectDB;
