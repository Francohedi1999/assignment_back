const express = require("express") ;
const router = express.Router() ;
const { create_user ,
        get_all_utilisateur ,
        get_utilisateur_by_id ,
        get_user_logged ,
        update_user_by_id ,
        update_profil , 
        get_utilisateur_no_pagination ,
        delete_or_restore_utilisateur } =  require( "../controllers/User.controller" ) ;
const { get_token } = require( "../controllers/Auth.controller" ) ;

router.post( "/" , [ get_token , create_user ] ) ;
router.put( "/update/:id_user" , [ get_token , update_user_by_id ] ) ;
router.put( "/update_profile/:id_user" , [ get_token , update_profil ] ) ;

router.get( "/" , [ get_token , get_all_utilisateur ] ) ;
router.get( "/no_pagination" , [ get_token , get_utilisateur_no_pagination ] ) ;
router.get( "/user_logged" , [ get_token , get_user_logged ] ) ;
router.get( "/:id" , [ get_token , get_utilisateur_by_id ] ) ;
router.put( "/delete_or_restore/:id_user" , [ get_token , delete_or_restore_utilisateur ] ) ;

module.exports = router 


