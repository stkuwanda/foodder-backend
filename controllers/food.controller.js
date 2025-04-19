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
		res.status(201).json({ success: true, message: 'Operation succeeded.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Operation failed with an error.' });
	}
}

// list all food
export async function listAllFood(req, res) {
	try {
		const foods = await foodModel.find({});
		res
			.status(201)
			.json({ success: true, data: foods, message: 'Operation succeeded.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Operation failed with an error.' });
	}
}

// remove one food item
export async function removeFood(req, res) {
	try {
		const food = await foodModel.findById(req.body.id);
		fs.unlink(`uploads/${food.image}`, () => {});
		await foodModel.findByIdAndDelete(req.body.id);
		res.status(200).json({ success: true, message: 'food item removed' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Operation failed with an error.' });
	}
}

// update one food item
// request must be multipart form data if
// an image update is required.
// the request can be JSON data if no image update is required
export async function updateFood(req, res) {
	let image, food;

	if (req.file) {
		image = `${req.file.filename}`;
	}

	try {
		const { id, ...updateData } = req.body; // Extract the id from the request body

		// update image
		if (image) {
			updateData.image = image;
			console.log('updateDate:', updateData);
			food = await foodModel.findById(req.body.id); // get current food item
		}

		// Find the item by ID and update it.  findByIdAndUpdate is a Mongoose function.
		const updatedItem = await foodModel.findByIdAndUpdate(id, updateData, {
			new: true, // Return the modified document rather than the original.
			runValidators: true, // Ensure that any schema validation is run.
		});

		if (!updatedItem) {
			// If no item with the id was found, return a 404 Not Found error.
			return res
				.status(404)
				.json({ success: false, message: 'Item not found' });
		}

		// delete old image from uploads if update is successful
		if (food) {
			fs.unlink(`uploads/${food.image}`, () => {});
		}

		// If the item was successfully updated, return the updated item.
		res
			.status(200)
			.json({ success: true, data: updatedItem, message: 'Operation succeeded.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'Operation failed with an error.' });
	}
}
