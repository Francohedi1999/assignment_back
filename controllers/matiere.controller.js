const Matiere = require('../models/matiere.model');
const User = require('../models/User.model');
const Utils = require('../utils/validationUtils');
const authMiddleware = require('../middleware/checkAuth');
const BASE_URL = process.env.BASE_URL ;
const path = require("path") ;

// Check si une matière avec la meme nom existe
async function verificationDoublon(nomMatiere) {
    const regExp = new RegExp('^' + nomMatiere + '$', 'i');
    const matiereExistante = await Matiere.exists({ nom: { $regex: regExp } });
    return matiereExistante;
}

// Creer Matiere
exports.createMatiere = [
    async (req, res) => {
        try {
            const { nom, imageMatiere, idProf } = req.body;

            // Check si l'ID du professeur is ObjectId valide
            if (!Utils.isValidObjectId(idProf)) {
                return res.status(400).json({ message: "L'ID du professeur n'est pas valide." });
            }

            // Check Doublon
            const existeDeja = await verificationDoublon(nom);
            if (existeDeja) {
                return res.status(400).json({ message: "Une matière du même nom existe déjà." });
            }

            if ( !req.files || Object.keys(req.files).length === 0 )
            {
                return res.status(200).json( { message: "Aucun image uploadé." , created : false } ) ;
            }

            const image = req.files.imageMatiere;
            image.mv( path.join( "uploads/images/matieres", image.name), (error) => console.log(error) );
            const file_url = BASE_URL + "/" + image.name ;

            // Vérifier si l'utilisateur avec l'ID idProf existe dans la base de données et a le rôle de professeur
            const professeur = await User.findOne({ _id: idProf, role: 'professeur' });
            if (!professeur) {
                return res.status(400).json({ message: "Le professeur saisie ne correspond pas à un profil professeur." });
            }

            // Créer la matière avec le professeur associé
            const nouvelleMatiere = new Matiere({
                nom,
                imageMatiere:file_url,
                idProf
            });

            // Créer la matière
            const matiereEnregistree = await nouvelleMatiere.save();
            return res.status(201).json({
                message: "Matière créée avec succès!",
                data: matiereEnregistree
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];
// Update Matiere
exports.updateMatiere = [
    async (req, res) => {
        try {
            const { id } = req.params; // ID Matiere
            const { nom, imageMatiere, idProf } = req.body;

            // Check si l'ID du professeur is ObjectId valide
            if (!Utils.isValidObjectId(idProf)) {
                return res.status(400).json({ message: "L'ID du professeur n'est pas valide." });
            }

            const matiereResult = await Matiere.findOne({ id: id });

            // Check si Matiere existe
            if (!matiereResult) {
                return res.status(404).json({ message: "La matière n'existe pas !" });
            }

            // Check Doublon
                const existeDeja = await verificationDoublon(nom);
                if (existeDeja) {
                    return res.status(400).json({ message: "Une matière du même nom existe déjà." });
                }

            // Check et mise a jour de l'ID du professeur
            const professeur = await User.findOne({ _id: idProf, role: 'professeur' });
            if (!professeur) {
                return res.status(400).json({ message: "Le professeur saisie ne correspond pas à un profil professeur." });
            }

            // Mettre a jour Matière
            matiereResult.nom = nom;
            matiereResult.imageMatiere = imageMatiere;
            matiereResult.idProf = idProf;

            // Save modifications
            const matiereMiseAJour = await matiereResult.save();
            return res.status(200).json({
                message: "Matière mise à jour avec succès!",
                data: matiereMiseAJour
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];
//Get Matiere by Id
exports.getMatiereById = async (req, res) => {
    try {
        const { id } = req.params;

        const matiere = await Matiere.findOne({ id: id });


        if (!matiere) {
            return res.status(404).json({ message: "La matière n'existe pas !" });
        }
        return res.status(200).json({
            message: "Matière récupérée avec succès!",
            data: matiere
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete Matiere
exports.deleteMatiere = [
    async (req, res) => {
        try {
            const { id } = req.params; // ID Matiere

            // Delete Matiere
            const matiereDeleted = await Matiere.findOneAndDelete({ id: id });
            if (!matiereDeleted) {
                return res.status(404).json({ message: "La matière n'existe pas !" });
            }
            return res.status(200).json({ message: "Matière supprimée avec succès!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];
// Get All Matiere
exports.getAllMatieres = async (req, res) => {
    try {
        // Get All Matiere dans bdd
        const matieres = await Matiere.find();

        return res.status(200).json({
            message: "Liste des matières récupérée avec succès!",
            data: matieres
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
