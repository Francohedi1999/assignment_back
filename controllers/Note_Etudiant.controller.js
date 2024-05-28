require('mongoose') ;
require("dotenv").config();
const Assignment_Model = require("../models/Assignment.model") ;
const User_Model = require("../models/User.model") ;
const Note_Etudiant_model = require("../models/Note_Etudiant.model") ;


get_note_by_assignment = async ( req , res ) =>
{    
    try
    { 
        let aggregate_query = Note_Etudiant_model.aggregate();
        
        const assignment_id = req.params.assignment_id ;
        aggregate_query.match({ assignment_id: assignment_id });
        
        if (req.query.filtre_rendu !== 'undefined') 
        {
            const rendu = req.query.filtre_rendu === 'true';
            aggregate_query.match({ rendu: rendu });
        }

        if (req.query.filtre_noted !== 'undefined') 
        {
            const noted = req.query.filtre_noted === 'true';
            aggregate_query.match({ noted: noted });
        }

        const options = 
        {
            page: parseInt( req.query.page ) || 1 ,
            limit: parseInt( req.query.limit ) || 10
        };

        Note_Etudiant_model.aggregatePaginate(aggregate_query, options, ( error , data ) => 
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
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}
 

get_note_by_assignment_etu = async ( req , res ) =>
{    
    try
    { 
        const assignment_id = req.params.assignment_id ;
        const etudiant_id = req.params.etudiant_id ;
        const notes = await Note_Etudiant_model.findOne( { assignment_id : assignment_id , etudiant_id : etudiant_id } ) ;
        return res.status(200).json( notes ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}
 
ajout_note_etu = async (req , res ) => 
{
    try
    { 
        const id_note = req.params.id_note ;
        const note_ = await Note_Etudiant_model.findById( id_note ) ;
        if( !note_ )
        {
            return res.status(200).json( { message: "Note non trouvée" , updated: false } ) ;
        }

        const note_update = { note : req.body.note , noted : true  } ;
        await Note_Etudiant_model.findOneAndUpdate( { _id: id_note } , note_update , { new: true } );                    
        return res.status(200).json( { message: "Note ajoutée avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

make_assignement = async (req , res ) => 
{
    try
    { 
        const id_note = req.params.id_note ;
        const note_ = await Note_Etudiant_model.findById( id_note ) ;
        if( !note_ )
        {
            return res.status(200).json( { message: "Note non trouvée" , updated: false } ) ;
        }

        const note_update = { rendu : true } ;
        await Note_Etudiant_model.findOneAndUpdate( { _id: id_note } , note_update , { new: true } );                    
        return res.status(200).json( { message: "Assignation rendu avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

module.exports = { 
    get_note_by_assignment , 
    get_note_by_assignment_etu , 
    ajout_note_etu , 
    make_assignement }