import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { placeOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/place', authenticate, placeOrder);

export default orderRouter;