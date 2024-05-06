const express = require("express") ;
const router = express.Router() ;
const { create_assignment , 
    get_all_assignment , 
    get_assignement_by_id } = require("../controllers/Assignment.controller"); 
const { get_token } = require( "../controllers/Auth.controller" ) ;

router.post( "/" , [ get_token , create_assignment ] ) ;
router.get( "/" , [ get_token , get_all_assignment ] ) ;
router.get( "/:id" , [ get_token , get_assignement_by_id ] ) ;

module.exports = router 