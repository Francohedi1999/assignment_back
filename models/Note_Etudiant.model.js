const mongoose = require("mongoose");
const mongoose_pagination = require('mongoose-aggregate-paginate-v2');

const note_etudiant_model = mongoose.Schema({

    assignment_id : { type: String , required: true } ,
    etudiant_id : { type: String , required: true } ,
    note : { type: Number , required: true  } ,
    rendu : { type: Boolean , required: false } ,
    noted : { type: Boolean , required: false } ,

}); 
note_etudiant_model.plugin(mongoose_pagination);
module.exports = mongoose.model( "note_etudiants" , note_etudiant_model );