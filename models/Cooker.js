const mongoose = require("mongoose");

//Modèle Cooker
const Cooker = mongoose.model("Cooker", {
  username: {
    unique: true,
    required: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  avatar: { Object },
});

module.exports = Cooker;
