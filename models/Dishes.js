const mongoose = require('mongoose');

const Dishes = mongoose.model('Dishes', {
	recipe_category: String,
	recipe_title: String,
    recipe_description: String,
    recipe_price: String,
	recipe_image: {
		type: mongoose.Schema.Types.Mixed,
		default: {},
	},
	
    creator: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Cooker",
	},
});
module.exports = Dishes;
