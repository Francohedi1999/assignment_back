const mongoose = require("mongoose");

// Vérifier si un ID est un ObjectId valide
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
    isValidObjectId
};
