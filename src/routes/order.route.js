import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { placeOrder, verifyOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/place', authenticate, placeOrder);
orderRouter.post('/verify', verifyOrder);

export default orderRouter;