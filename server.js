import { connect } from './config/db.js';
import app from './src/app.js';
import 'dotenv/config';

const port = process.env.PORT;

// connect to db
connect();

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}...`);
});
