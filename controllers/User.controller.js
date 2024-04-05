require('mongoose') ;
require("dotenv").config();

const path = require("path") ;
const bcrypt = require("bcrypt") ;
const User_Model = require("../models/User.model") ;
const BASE_URL = process.env.BASE_URL ;


create_user = async ( req , res ) => 
{
    try
    {
        const user = await User_Model.findOne({ email: req.body.email }) ;
        if( user )
        {
            return res.status(200).json( { message: "Cet utilisateur existe déjà" , created : false } ) ;
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
            niveau : req.body.niveau || "",
        } ) ;

        return res.status(200).json( { message: "L'utilisateur a été bien ajoutée" , created : true  } ) ;

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

get_all_utilisateur = async ( req , res ) =>
{
    try
    {
        const role_filtre = req.query.filtre_role ;
        if( !role_filtre )
        {            
            const users = await User_Model.find() ;
            return res.status(200).json( users ) ;
        }
        const users_filtred = await User_Model.find( { role: role_filtre} ) ;
        return res.status(200).json( users_filtred ) ;
    }
    catch (error) 
    {
        return res.status(400).json( { message: error } )
    } 
} ;

get_utilisateur_by_id = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;
                
        return res.status(200).json( utilisateur ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

update_user_by_id = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }

        const update = {
            nom: req.body.nom ,
            prenom: req.body.prenom ,
            email: req.body.email ,
            niveau: req.body.niveau || "" ,
            role: req.body.role ,
            img_url: req.body.img_url ,
        }

        await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );
                
        return res.status(200).json( { message: "Utilisateur non trouvé" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

module.exports = { create_user , get_all_utilisateur , get_utilisateur_by_id , update_user_by_id }