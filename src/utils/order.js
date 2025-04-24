import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeSession(line_items, newOrder, mode = 'payment') {
	const session = await stripe.checkout.sessions.create({
		line_items,
		mode,
		success_url: `${process.env.FRONT_END_URL}/verify?success=true&orderId=${newOrder._id}`,
		cancel_url: `${process.env.FRONT_END_URL}/verify?success=false&orderId=${newOrder._id}`,
	});
	return session;
}

