const express = require("express") ;
const router = express.Router() ;
const { create_user ,
        get_all_utilisateur } =  require( "../controllers/User.controller" ) ;

router.post( "/" , [ create_user ] ) ;
router.get( "/" , [ get_all_utilisateur ] ) ;

module.exports = router


