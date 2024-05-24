const mongoose = require("mongoose");

const assignment_model = mongoose.Schema({

    matiere_id : { type: String , required: true } ,
    description : { type: String , required: true  } ,
    niveau : { type: String , required: false } ,
    dl : { type: Date , required: true } 

});

module.exports = mongoose.model( "assignments" , assignment_model ); 