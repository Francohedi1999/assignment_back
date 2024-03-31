require('mongoose') ;
require("dotenv").config();

const path = require("path") ;
const bcrypt = require("bcrypt") ;
const User_Model = require("../models/User.model") ;
const BASE_URL = process.env.BASE_URL ;


create_user = async ( req , res , next ) => 
{
    try
    {
        const user = await User_Model.findOne({ email: req.body.email }) ;
        if( user )
        {
            return res.status(200).json( { message: "Cet utilisateur existe déjà" , user , created : false } ) ;
        }

        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            return res.status(200).json( { message: "Aucun image uploadé." , created : false } ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/" + image.name ;

        const password_ = await bcrypt.hash( req.body.password , 10 ) ;

        const new_user = await User_Model.create( {
            nom : req.body.nom ,
            prenom : req.body.prenom ,
            email : req.body.email ,
            password : password_ ,
            img_url : file_url ,
            role : req.body.role ,
            niveau_id : req.body.niveau_id ,
        } ) ;
    
        return res.status(200).json( { message: "L'utilisateur a été bien ajoutée" , user: new_user , created : true  } ) ;

    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur create user");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
} ;


module.exports = { create_user }