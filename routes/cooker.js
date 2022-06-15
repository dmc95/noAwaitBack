//Import du package express
const express = require("express");
//Appel de la fonction Router() issue du package express
const router = express.Router();

//Création des constantes uid2, cryptoJs
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


//const cloudinary = require("cloudinary").v2;

//import des models
const User = require("../Models/User");
const Cooker = require("../Models/Cooker");
const isCooker = require("../middlewares/isCooker");

//======================================================//
//Route signup cooker
router.post("/cooker/signup", async (req, res) => {
  //destructuring
  const { username, password } = req.fields;
  try {
    //recherche de l'email dans la bdd
    const cooker = await Cooker.findOne({ username: username });
    //si l'utilisateur existe on n'autorise pas l'inscription
    if (cooker) {
      res.status(409).json({ message: "this user already has an account" });
    } else {
      if ( username && password ) {
        //encryptage du mot de passe
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        //Génération du token
        const token = uid2(64);
        //Créer un nouvel utilisateur
        const newCooker = new Cooker({
          
            username: username,
  
          password: password,
          token: token,
          hash: hash,
          salt: salt,
        });
        //Sauvegarder l'utilisateur
        await newCooker.save();
        //Envoi de la réponse au client
        res.status(200).json({
          _id: newCooker._id,
          token: newCooker.token,
          username: newCooker.username,
        });
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//===========================================================//
//Route login cooker
router.post("/cooker/login", async (req, res) => {
  try {
    //Destructuring:
    const { username, password } = req.fields;
    //recherche de l'email dans la base de donnée:
    const cooker = await Cooker.findOne({ username: username });
    if (cooker) {
      console.log(cooker);
      //Si l'utilisateur existe:
      if (
        //Verifier que le mot de passe est le bon:
        SHA256(password + cooker.salt).toString(encBase64) === cooker.hash
      ) {
        res.status(200).json({
          _id: cooker.id,
          token: cooker.token,
          username: cooker.username,
        });
      } else {
        res.status(400).json({ error: "unauthorized" });
      }
    } else {
      res.status(400).json({ message: "cooker not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Export du router
module.exports = router;