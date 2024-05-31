require("dotenv").config();

const mongoose = require("mongoose") ;
const uri = process.env.MONGO_URI ;

const connection_mongoDB = async () => {
    try 
    {
        mongoose.set( "strictQuery" , false);
        await mongoose.connect( uri );
        console.log( "" ) ;
        console.log("Base de données connectée");
        console.log( "" ) ;
    } 
    catch (error) 
    {
        console.log( "" ) ;
        console.log( "Erreur de connexion à la base de données: " ) ;
        console.log( error );
        console.log( "" ) ;
        throw error;
    }
};
  
module.exports = { connection_mongoDB }
  