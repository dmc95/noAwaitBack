const Cooker = require("../Models/Cooker");

const isCooker = async (req, res, next) => {
  try {
    //console.log(req.headers);
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      //console.log(token);
      //Si le token existe, on cherche l'artist dans la BDD
      const cooker = await Cooker.findOne({ token: token }).select("account id email");
      
      if (cooker) {
        //Ajout d'une clé artist à l'objet req contenant les infos de artist
        req.cooker = cooker;
        return next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = isCooker;
