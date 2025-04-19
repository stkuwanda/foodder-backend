import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		cartData: { type: Object, default: {} },
	},
	{ minimize: false } // to allow cartData to be created with an empty object, i.e no data
);

export const userModel = mongoose.models.user || mongoose.model('user', userSchema);
