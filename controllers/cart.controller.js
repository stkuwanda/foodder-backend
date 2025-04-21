import { userModel } from '../models/user.model.js';
import { handleError } from '../util/errors.js';

// add items to a user's cart
export async function addToCart(req, res) {
	try {
		let userData = await userModel.findOne({ _id: req.body.userId });
		let cartData = userData.cartData;

		if (!cartData[req.body.itemId]) {
			cartData[req.body.itemId] = 1;
		} else {
			cartData[req.body.itemId] += 1;
		}

		await userModel.findByIdAndUpdate(req.body.userId, { cartData });

		res.status(201).json({ success: true, message: 'Added to cart' });
	} catch (error) {
		handleError(error, res);
	}
}

// remove items from a user's cart
export async function removeFromCart(req, res) {}

// fetch user cart data
export async function retrieveCart(req, res) {}
