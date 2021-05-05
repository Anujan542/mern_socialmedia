const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("mogondb connected".blue.bold);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
