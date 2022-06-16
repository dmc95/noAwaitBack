const express= require('express');
const formidable = require('express-formidable')
const mongoose = require('mongoose');
const encBase64 = require('crypto-js/enc-base64');
const uid = require('uid2');
const cloudinary = require("cloudinary")
const app = express();
app.use(formidable());

//Import des routes
const userRoutes = require('./routes/user');
const cookerRoutes = require('./routes/cooker');
const dishesRoutes = require('./routes/dishes')
//Utilisation des routes
app.use(userRoutes);
app.use(cookerRoutes);
app.use(dishesRoutes);
//connection à la bdd
mongoose.connect("mongodb://localhost/noAwaitBack", {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})

//Configuration cloudinary
cloudinary.config({ 
    cloud_name: 'dbzfaosnn', 
    api_key: '639558478356169', 
    api_secret: '8wZoqKBwI-EFLlu_ibz-DD0BG6o',
    secure: true
  });

app.all('*', (req, res) => {
	res.status(404).json({ message: "Cette page n'existe pas" });
});

app.listen(3005, () => {
	console.log('server started');
});
