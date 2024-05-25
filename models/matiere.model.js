const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const matiere_model = Schema({
    id: { type: String, default: uuidv4 }, // UUID
    nom: { type: String, required: true },
    imageMatiere : { type: String , required: true } ,
    idProf: { type: String , required: true , ref: 'User' },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
});

module.exports = mongoose.model( "matieres" , matiere_model );