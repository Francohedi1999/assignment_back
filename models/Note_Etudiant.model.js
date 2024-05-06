const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const note_etudiant_model = mongoose.Schema({

    matiere_id : { type: String , required: true } ,
    etudiant_id : { type: String , required: true } ,
    note : { type: Number , required: true  } ,
    rendu : { type: boolean , required: false }  ,
    niveau : { type: String , required: false } 

});
 
module.exports = mongoose.model( "note_etudiants" , note_etudiant_model );