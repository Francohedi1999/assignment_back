const mongoose = require("mongoose");

const note_etudiant_model = mongoose.Schema({

    assignment_id : { type: String , required: true } ,
    etudiant_id : { type: String , required: true } ,
    note : { type: Number , required: true  } ,
    rendu : { type: Boolean , required: false } 

}); 
module.exports = mongoose.model( "note_etudiants" , note_etudiant_model );