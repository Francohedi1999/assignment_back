require("dotenv").config() ;

const { connection_mongoDB } = require("./config/mongoDB") ;
const express = require("express") ;
const cors = require("cors") ;
const app = express() ;
const body_parser = require("body-parser") ;
const User_Routes = require("./routes/User.route") ;
const Auth_Routes = require("./routes/Auth.route");
const {create_admin} = require("./config/Config") ;
const file_upload = require('express-fileupload');
const port = process.env.PORT ;
const path = require("path") ;

connection_mongoDB() ;
create_admin() ; 

app.use( cors() );
app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use( file_upload() );
app.use(express.static( path.join(__dirname, 'uploads'))) ;

app.use( "/user" , User_Routes ) ;
app.use( "/auth" , Auth_Routes ) ;
 
app.listen( port , () => {
    console.log("");
    console.log("Serveur démarré sur le port " + port);
    console.log("");
} );