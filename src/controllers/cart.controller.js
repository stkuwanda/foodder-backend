import { userModel } from '../models/user.model.js';
import { checkIfCartIsEmpty } from '../utils/cart.js';
import { handleError } from '../utils/errors.js';

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

export async function setNewCart(req, res) {
	const { cartData, userId } = req.body;

	try {
		await userModel.findByIdAndUpdate(userId, { cartData });

		res.status(201).json({ success: true, message: 'Added new cart' });
	} catch (error) {
		handleError(error, res);
	}
}

// remove items from a user's cart
export async function removeFromCart(req, res) {
	let message = 'Item removed from cart.';

	try {
		let userData = await userModel.findById(req.body.userId);
		let cartData = userData.cartData;

		if (cartData[req.body.itemId] > 0) {
			cartData[req.body.itemId] -= 1;

			userData = await userModel.findByIdAndUpdate(
				req.body.userId,
				{ cartData },
				{ new: true }
			);
			
			cartData = userData.cartData;

			if (checkIfCartIsEmpty(cartData)) {
				await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
				message = 'This cart is empty.';
			}

			return res.status(200).json({ success: true, message });
		} else {
			if (checkIfCartIsEmpty(cartData)) {
				await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
				message = 'This cart is empty.';
			}

			return res.status(200).json({ success: true, message });
		}
	} catch (error) {
		handleError(error, res);
	}
}

// fetch user cart data
export async function retrieveCart(req, res) {
	try {
		let userData = await userModel.findById(req.body.userId);
		let cartData = userData.cartData;
		res
			.status(200)
			.json({ success: true, cartData, message: 'Retrieved cart data.' });
	} catch (error) {
		handleError(error, res);
	}
}
