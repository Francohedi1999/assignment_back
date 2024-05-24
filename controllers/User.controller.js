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
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;

        const password_ = await bcrypt.hash( req.body.password , 10 ) ;

        await User_Model.create( {
            nom : req.body.nom ,
            prenom : req.body.prenom ,
            email : req.body.email ,
            password : password_ ,
            img_url : file_url ,
            role : req.body.role ,
            niveau : req.body.niveau || "",
            deleted : false ,
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

// function getAssignments(req, res){
//     let aggregateQuery = Assignment.aggregate();

//     Assignment.aggregatePaginate(
//         aggregateQuery, 
//         {
//             page: parseInt(req.query.page) || 1,
//             limit: parseInt(req.query.limit) || 10
//         },
//         (err, data) => {
//             if(err){
//                 res.send(err)
//             }
    
//             res.send(data);
//         }
//     );
// }

get_utilisateur_no_pagination = async ( req , res ) =>
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
}

get_all_utilisateur = async ( req , res ) =>
{
    try
    {
        let aggregate_query = User_Model.aggregate() ;

        const role_filtre = req.query.filtre_role ;
        const niveau_filtre = req.query.niveau_filtre ;

        if( role_filtre )
        {            
            aggregate_query.match({ role: role_filtre });
        }

        if( niveau_filtre )
        {            
            aggregate_query.match({ niveau: niveau_filtre });
        }

        const options = 
        {
            page: parseInt(req.query.page) || 1 ,
            limit: parseInt(req.query.limit) || 10
        };

        User_Model.aggregatePaginate(aggregate_query, options, ( error , data ) => 
        {
            if (error) 
            {
                console.log(error);
            } 
            else 
            {
                return res.status(200).json( data ) ;
            }
        });
    }
    catch (error) 
    {
        console.log( error )
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
        const id_utilisateur = req.body._id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }
        
        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            const update = {
                nom: req.body.nom ,
                prenom: req.body.prenom ,
                email: req.body.email ,
                niveau: req.body.niveau || "" ,
                role: req.body.role ,
                img_url: req.body.img_url
            }
    
            await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
            return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;
 
        const update = {
            nom: req.body.nom ,
            prenom: req.body.prenom ,
            email: req.body.email ,
            niveau: req.body.niveau || "" ,
            role: req.body.role ,
            img_url: file_url
        }

        await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
        return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

update_profil = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.body._id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }
        
        const password_ = await bcrypt.hash( req.body.password , 10 ) ;

        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            const update = {
                nom: req.body.nom ,
                prenom: req.body.prenom ,
                password: password_ ,
                img_url: req.body.img_url
            }
    
            await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
            return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;

        const update = {
            nom: req.body.nom ,
            prenom: req.body.prenom ,
            password: password_ ,
            img_url: file_url
        }

        await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
        return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

delete_or_restore_utilisateur = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }

        if( utilisateur.deleted === true )
        {
            await User_Model.findByIdAndUpdate(
                id_utilisateur , 
                { deleted: false } ,
                { new: true }
            );
            return res.status(200).json( { message : "L'utilisateur a été bien restaurée" } ) ;
        }
        else
        {
            await User_Model.findByIdAndUpdate(
                id_utilisateur , 
                { deleted: true  }  ,
                { new: true }
            );        
            return res.status(200).json( { message : "L'utilisateur a été bien supprimée" } ) ;
        }

    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

get_user_logged = async ( req , res , next ) => 
{
    try  
    {
        const user_logged = await User_Model.findById( req.user._id ) ;
        return res.status(200).json( user_logged ) ;
    } 
    catch (error) 
    {
        return res.status(400).json( { message: error } )
    }   
} ;

module.exports = { create_user , 
    get_user_logged ,
    get_all_utilisateur , 
    get_utilisateur_by_id , 
    update_user_by_id , 
    update_profil ,
    get_utilisateur_no_pagination ,
    delete_or_restore_utilisateur }