require('mongoose') ;
require("dotenv").config();
const Assignment_Model = require("../models/Assignment.model") ;
const User_Model = require("../models/User.model") ;
const Note_Etudiant_model = require("../models/Note_Etudiant.model") ;
const Matiere_Model = require("../models/matiere.model") ;

create_assignment = async ( req , res ) => 
{   
    const etudiants = await User_Model.find( { niveau : req.body.niveau  } ) ;

    if( etudiants.length === 0 )
    {
        return res.status(200).json( {  message: "Veuillez bien ajouter des étudiants pour le niveau " + req.body.niveau , 
                                        created : false  } ) ;
    }
    else
    {
        const assignment = await Assignment_Model.create( {
            matiere_id : req.body.matiere_id , 
            description : req.body.description , 
            niveau : req.body.niveau ,
            dl: req.body.dl ,
            ens_id:  req.body.ens_id ,
            canceled: false
        } ) ;
    
        const promises = etudiants.map( etudiant => 
            Note_Etudiant_model.create( {
                                            assignment_id : assignment._id ,
                                            etudiant_id : etudiant._id ,
                                            remarque : "" ,
                                            note : 0 ,
                                            rendu : false ,
                                            noted : false 
                                        } ) );    
        await Promise.all(promises);
    
        return res.status(200).json( {  message: "L'assignement : " + req.body.description + " a été bien ajoutée" , 
                                        created : true  } ) ;
    }
}

// avec filtre par niveau ou non
get_all_assignment = async ( req , res ) =>
{
    try
    {
        let aggregate_query = Assignment_Model.aggregate() ;

        const filtre_canceled = req.query.filtre_canceled;
        if (filtre_canceled !== 'undefined') 
        {
            const canceled = filtre_canceled === 'true';
            aggregate_query.match({ canceled: canceled });
        }

        const id_enseignant = req.query.id_enseignant ;
        if( id_enseignant )
        {     
            aggregate_query.match({ ens_id: id_enseignant });
        }

        const niveau_filtre = req.query.filtre_niveau ;
        if( niveau_filtre )
        {            
            aggregate_query.match({ niveau: niveau_filtre });
        }


        const options = 
        {
            page: parseInt(req.query.page) || 1 ,
            limit: parseInt(req.query.limit) || 10
        };
        Assignment_Model.aggregatePaginate(aggregate_query, options, ( error , data ) => 
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
        return res.status(400).json( { message: error } )
    } 
} ;


delete_assignment = async (req , res )  =>
{
    try
    { 
        const id_assignment = req.params.id ;
        const assignment = await Assignment_Model.findById( id_assignment ) ;
        if( !assignment )
        {
            return res.status(200).json( { message: "Assignation non trouvée" , updated: false } ) ;
        }
        const assignment_update = { canceled : true } ;
        await Assignment_Model.findOneAndUpdate( { _id: id_assignment } , assignment_update , { new: true } );                    
        return res.status(200).json( { message: "Assignation supprimée avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

get_assignement_by_id = async ( req , res ) =>
{
    try
    {  
        const id_assignement = req.params.id ;
        const assignement = await Assignment_Model.findOne( { _id: id_assignement , canceled: false } ) ;
                
        return res.status(200).json( assignement ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}


module.exports = {  create_assignment ,
                    delete_assignment ,
                    get_all_assignment , 
                    get_assignement_by_id }