require("dotenv").config() ;

const { connection_mongoDB } = require("./config/mongoDB") ;
const express = require("express") ;
const cors = require("cors") ;
const app = express() ;
const body_parser = require("body-parser") ;
const User_Routes = require("./routes/User.route") ;
const Matiere_Routes = require("./routes/matiere.route") ;
const file_upload = require('express-fileupload');
const port = process.env.PORT ;
const path = require("path") ;

app.use( cors() );
app.use( body_parser.json() );
app.use( body_parser.urlencoded({ extended: true }) );
app.use( file_upload() );
app.use(express.static( path.join(__dirname, 'uploads'))) ;

app.use( "/user" , User_Routes ) ;
app.use( "/matieres" , Matiere_Routes ) ;

connection_mongoDB() ;
 
app.listen( port , () => {
    console.log("");
    console.log("Serveur démarré sur le port " + port);
    console.log("");
} );