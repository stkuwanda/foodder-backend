import express from 'express';
import { removeFromCart, addToCart, retrieveCart } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post('/add', addToCart);

cartRouter.delete('/remove', removeFromCart);

cartRouter.get('/retrieve', retrieveCart);

export default cartRouter;
