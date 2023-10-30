import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.warn('"process.env.MONGODB_URI" not defined');
    return;
  }

  if (!process.env.MONGODB_DB_NAME) {
    console.warn('"process.env.MONGODB_DB_NAME" not defined');
    return;
  }

  try {
    const connectionResult = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    });

    isConnected = true;

    console.log("MongoDB connected");

    return connectionResult.connection.db;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
