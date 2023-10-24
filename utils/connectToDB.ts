import mongoose from 'mongoose';

let isConnected = false; // track the connection

const connectToDB = async () => {
  // mongoose.set('strictQuery', true);

  if(isConnected) {
    // console.log('MongoDB is already connected');
    return;
  }

  if(!process.env.MONGODB_URI) {
    console.warn('"process.env.MONGODB_URI" not defined');
    return;
  }

  if(!process.env.MONGODB_DB_NAME) {
    console.warn('"process.env.MONGODB_DB_NAME" not defined');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}

export default connectToDB;
