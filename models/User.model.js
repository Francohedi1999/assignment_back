const mongoose = require("mongoose");

const user_model = mongoose.Schema({

    nom : { type: String , required: true  } ,
    prenom : { type: String , required: true } ,
    email : { type: String , required: true } ,
    password : { type: String , required: true } ,
    img_url : { type: String , required: true } ,
    role : { type: String , required: true } ,
    niveau_id : { type: String , required: false } 

});
 
module.exports = mongoose.model( "users" , user_model );