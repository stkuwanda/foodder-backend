import fs from 'fs';
import foodModel from '../models/food.model.js';

// add food item
export async function addFood(req, res) {
	// extract image name and extension
	const image = `${req.file.filename}`;

	// add request data into model for saving to db
	const food = foodModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image,
	});

	// create data into db
	try {
		await food.save();
		res.status(201).json({ success: true, message: 'food added' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
}

// list all food
export async function listAllFood(req, res) {
	try {
		const foods = await foodModel.find({});
		res
			.status(201)
			.json({ success: true, data: foods, message: 'Retrieved food list.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
}

// remove one food item
export async function removeFood(req, res) {
	try {
		const food = await foodModel.findById(req.body.id);
		fs.unlink(`uploads/${food.image}`, () => {});
		await foodModel.findByIdAndDelete(req.body.id);
		res.status(200).json({ success: true, message: 'food item removed'});
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
}
