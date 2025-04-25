import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { listUserOrders, placeOrder, verifyOrder, listOrders} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/place', authenticate, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/orders', authenticate, listUserOrders);
orderRouter.get('/list', listOrders);

export default orderRouter;