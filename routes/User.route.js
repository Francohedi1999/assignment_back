const express = require("express") ;
const router = express.Router() ;
const { create_user ,
        get_all_utilisateur ,
        get_utilisateur_by_id ,
        update_user_by_id } =  require( "../controllers/User.controller" ) ;

router.post( "/" , [ create_user ] ) ;
router.get( "/" , [ get_all_utilisateur ] ) ;
router.get( "/:id" , [ get_utilisateur_by_id ] ) ;
router.put( "/:id" , [ update_user_by_id ] ) ;

module.exports = router


