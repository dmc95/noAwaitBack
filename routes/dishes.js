const express = require('express');
const isCooker = require('../middlewares/isCooker');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

//import des modèles
//const User = require("../models/User");
//const Dishes = require("../models/Dishes");
//const Cooker = require("../models/Cooker")

const User = require('../Models/User');
const Cooker = require('../Models/Cooker');
const Dishes = require('../Models/Dishes');

router.post('/dishes/publish', isCooker, async (req, res) => {
	try {
		//console.log(req.fields);
		//console.log(req.files.picture.path);
		const { category, title, description, image, price } = req.fields;
		//publier une nouvelle recette
		const newDishes = new Dishes({
			recipe_category: category,
			recipe_title: title,
			recipe_description: description,
			recipe_price: price,
			creator: req.cooker,
    });
    
		// envoi de l'image vers cloudinary
		const result = await cloudinary.uploader.upload(req.files.picture.path, {
			folder: `/noAwaitBack/dishes/${newDishes._id}`,
		});

		//Ajouter result  à image
		newDishes.recipe_image = result;
		//sauvegarder la recette
		await newDishes.save();
		res.json(newDishes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;


//	_id: newDishes._id,
// recipe_category: newDishes.recipe_category,
// recipe_title: newDishes.recipe_title,
// recipe_description: newDishes.recipe_description,
// recipe_price: newDishes.recipe_price,
// creator: {
//   username: newDishes.creator.username,
//   _id: newDishes.creator._id,
//   recipe_image: newDishes.recipe_image,