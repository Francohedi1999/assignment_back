const express = require("express") ;
const router = express.Router() ;
const { get_token } = require( "../controllers/Auth.controller" ) ;
const { ajout_note_etu , 
    get_note_by_assignment , 
    make_assignement ,
    get_note_by_assignment_etu } = require("../controllers/Note_Etudiant.controller") ;

router.get( "/:assignment_id" , [ get_token , get_note_by_assignment ] ) ;
router.put( "/make/:id_note" , [ get_token , make_assignement ] ) ;
router.get( "/etu/:assignment_id/:etudiant_id" , [ get_token , get_note_by_assignment_etu ] ) ;
router.put( "/ajout/:id_note" , [ get_token , ajout_note_etu ] ) ;

module.exports = router 