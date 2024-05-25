require('mongoose') ;
require("dotenv").config();
const Assignment_Model = require("../models/Assignment.model") ;
const User_Model = require("../models/User.model") ;
const Note_Etudiant_model = require("../models/Note_Etudiant.model") ;


get_note_by_assignment = async ( req , res ) =>
{    
    try
    { 
        const assignment_id = req.params.assignment_id ;
        const notes = await Note_Etudiant_model.find( { assignment_id : assignment_id } ) ;

        return res.status(200).json( notes ) ;
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
        const id_note = req.body._id ;
        const note_ = await Note_Etudiant_model.findById( id_note ) ;
        if( !note_ )
        {
            return res.status(200).json( { message: "Note non trouvée" , updated: false } ) ;
        }

        const note_update = { note : req.body.note , rendu : true } ;
        await Note_Etudiant_model.findOneAndUpdate( { _id: id_note } , note_update , { new: true } );                    
        return res.status(200).json( { message: "Note ajoutée avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

module.exports = { get_note_by_assignment , get_note_by_assignment_etu , ajout_note_etu }