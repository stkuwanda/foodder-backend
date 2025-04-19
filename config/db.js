import mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Db connection established...');
}