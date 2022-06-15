const express= require('express');
const formidable = require('express-formidable')
const mongoose = require('mongoose');
const encBase64 = require('crypto-js/enc-base64');
const uid = require('uid2');

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

app.all('*', (req, res) => {
	res.status(404).json({ message: "Cette page n'existe pas" });
});

app.listen(3005, () => {
	console.log('server started');
});
