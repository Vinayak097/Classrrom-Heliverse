import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("connecting");
    await mongoose.connect("mongodb+srv://root:15root@cluster0.nezzouv.mongodb.net/classroom");
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    return;
  }
};

export default connectDB;
