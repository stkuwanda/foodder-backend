import express from 'express';
import cors from 'cors';
import foodRouter from './routes/food.route.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.route.js';

// app config
const app = express();

// middleware
app.use(
  express.json(), // parse all json data
  cors() // access backend from anywhere
);

// api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/images', express.static('uploads'));

export default app;