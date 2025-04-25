import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import {
	removeFromCart,
	addToCart,
	retrieveCart,
	setNewCart
} from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post('/add', authenticate, addToCart);

cartRouter.post('/new', authenticate, setNewCart);

cartRouter.delete('/remove', authenticate, removeFromCart);

cartRouter.get('/retrieve', authenticate, retrieveCart);

export default cartRouter;
