const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matiere_model = Schema({
    nom: { type: String, required: true },
    imageMatiere : { type: String , required: true } ,
    idProf: { type: String,required: true, ref: 'User' }
});

module.exports = mongoose.model( "matieres" , matiere_model );