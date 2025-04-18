import express from 'express';
import cors from 'cors';
import { connect } from './config/db.js';
import foodRouter from './routes/food.route.js';

// app config
const app = express();
const port = 4000;

// middleware
app.use(
  express.json(), // parse all json data
  cors() // access backend from anywhere
);

// connect to db
connect();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));

// routes
app.get('/', (req, res) => {
  res.send('API working...');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}...`);
});