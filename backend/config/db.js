import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("connecting");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    return;
  }
};

export default connectDB;
