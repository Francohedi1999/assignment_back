const express = require("express") ;
const router = express.Router() ;
const { create_user } =  require( "../controllers/User.controller" ) ;

router.post( "/" , [ create_user ] ) ;

module.exports = router


