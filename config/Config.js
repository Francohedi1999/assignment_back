require('mongoose') ;
require("dotenv").config();

const bcrypt = require("bcrypt") ;
const User_Model = require("../models/User.model") ;
const BASE_URL = process.env.BASE_URL ;

create_admin = async () => 
{
    try
    {
        const user = await User_Model.findOne({ email: "administrateur@gmail.com" }) ;
        if( !user )
        {
            const password_ = await bcrypt.hash( "0000" , 10 ) ;

            await User_Model.create( {
                nom : "Administrateur" , 
                prenom : "Admin" ,
                email : "administrateur@gmail.com" ,
                password : password_ ,
                img_url : BASE_URL + "/user.png" ,
                role : "Administrateur" ,
                niveau : "",
                deleted : false ,
            } ) ;  
        }
        console.log("");
        console.log("");
        console.log("Create Admin");
        console.log("");
        console.log("");
    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur create Admin");
        console.log(error);
        console.log("");
    }
} ;

module.exports = {create_admin} ;