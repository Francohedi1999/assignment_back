const mongoose = require("mongoose");
const mongoose_pagination = require('mongoose-aggregate-paginate-v2');

const user_model = mongoose.Schema({

    nom : { type: String , required: true  } ,
    prenom : { type: String , required: true } ,
    email : { type: String , required: true } ,
    password : { type: String , required: true } ,
    img_url : { type: String , required: true } ,
    role : { type: String , required: true } ,
    niveau : { type: String , required: false } ,
    deleted : { type: Boolean , required: true } ,

});

user_model.plugin(mongoose_pagination);
 
module.exports = mongoose.model( "users" , user_model ); 