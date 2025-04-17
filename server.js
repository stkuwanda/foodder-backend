import express from 'express';
import cors from 'cors';

// app config
const app = express();
const port = 4000;

// middleware
app.use(
  express.json(), // parse all json data
  cors() // access backend from anywhere
);

// routes
app.get('/', (req, res) => {
  res.send('API working...')
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}...`);
});

