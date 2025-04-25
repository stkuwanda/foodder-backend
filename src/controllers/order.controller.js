import { orderModel } from '../models/order.model.js';
import { userModel } from '../models/user.model.js';
import { createStripeSession } from '../utils/order.js';
import { handleError } from '../utils/errors.js';

// frontend: placing user order
export async function placeOrder(req, res) {
	try {
		const newOrder = new orderModel({
			userId: req.body.userId,
			items: req.body.items,
			amount: req.body.amount,
			address: req.body.address,
		});

		await newOrder.save();
		await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

		// create line-items for stripe
		const line_items = req.body.items.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: { name: item.name },
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));

		line_items.push({
			price_data: {
				currency: 'usd',
				product_data: { name: 'Delivery charges' },
				unit_amount: 2 * 100,
			},
			quantity: 1,
		});

		const session = await createStripeSession(line_items, newOrder);

		res.status(201).json({
			success: true,
			sessionUrl: session.url,
			message: 'Order created.',
		});
	} catch (error) {
		handleError(error, res);
	}
}

// very order
export async function verifyOrder(req, res) {
	const { orderId, success } = req.body;

	try {
		if (success === 'true') {
			await orderModel.findByIdAndUpdate(orderId, { payment: true });

			return res.status(200).json({ success: true, message: 'Paid' });
		}

		await orderModel.findByIdAndDelete(orderId);
		res.status(200).json({ success: false, message: 'Unpaid' });
	} catch (error) {
		handleError(error, res);
	}
}

// frontend user orders
export async function listUserOrders(req, res) {
	const { userId } = req.body;
	try {
		// get orders
		const data = await orderModel.find({ userId });
		res.status(200).json({ success: true, data, message: 'Orders data.' });
	} catch (error) {
		handleError(error, res);
	}
}

// admin orders list
export async function listOrders(req, res) {
	try {
		// get orders
		const data = await orderModel.find({});
		res.status(200).json({ success: true, data, message: 'Orders data.' });
	} catch (error) {
		handleError(error, res);
	}
}