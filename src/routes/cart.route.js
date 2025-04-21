import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import {
	removeFromCart,
	addToCart,
	retrieveCart,
} from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post('/add', authenticate, addToCart);

cartRouter.delete('/remove', authenticate, removeFromCart);

cartRouter.get('/retrieve', authenticate, retrieveCart);

export default cartRouter;
