import express from 'express';
import { addFood, listAllFood } from '../controllers/food.controller.js';
import multer from 'multer';

// create foodRouter
const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		return cb(null, `${Date.now()}${file.originalname}`);
	},
});

const upload = multer({ storage });

foodRouter.post('/add', upload.single('image'), addFood);

foodRouter.get('/list', listAllFood);

export default foodRouter;
