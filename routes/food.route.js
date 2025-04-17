import express from 'express';
import { addFood } from '../controllers/food.controller.js';
import multer from 'multer';

// create foodRouter
const foodRouter = express.Router();
export default foodRouter;

