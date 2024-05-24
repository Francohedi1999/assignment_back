const mongoose = require("mongoose");
const mongoose_pagination = require('mongoose-aggregate-paginate-v2');

const assignment_model = mongoose.Schema({

    matiere_id : { type: String , required: true } ,
    description : { type: String , required: true  } ,
    niveau : { type: String , required: false } ,
    dl : { type: Date , required: true } 

});

assignment_model.plugin(mongoose_pagination);

module.exports = mongoose.model( "assignments" , assignment_model ); 