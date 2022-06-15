const express = require("express");
const isCooker = require("../middlewares/isCooker");
const router = express.Router();

router.post("/track/publish", isCooker, (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files.track.path);
    // console.log(req.files.image.path);

    const { 
      title, 
      track, 
      image } 
      = req.fields;

      //publier un nouveau titre
      
      // envoi du titre vers cloudinary
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;