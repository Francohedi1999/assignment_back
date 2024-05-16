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

// Check si une matière avec la meme nom existe (lors de l'update) Ceci va exclure son propre nom
async function verificationDoublonUpdate(idMatiere, nomMatiere) {
    const regExp = new RegExp('^' + nomMatiere + '$', 'i');
    const matiereExistante = await Matiere.exists({ id: { $ne: idMatiere }, nom: { $regex: regExp } });
    return matiereExistante;
}

// Creer Matiere
exports.createMatiere = [
    async (req, res) => {
        try {
            const { nom, imageMatiere, idProf } = req.body;
            const errors = [];
            // Verification du champ nom
            if (!nom || !nom.trim()) {
                errors.push("Le nom de la matière est requis.");
            }

            // Verification du champ idProf
            if (!idProf || !idProf.trim()) {
                errors.push("Le professeur est requis.");
            }

            // Check si l'ID du professeur is ObjectId valide
            if (!Utils.isValidObjectId(idProf)) {
                errors.push("L'ID du professeur n'est pas valide.");
            }

            // Check Doublon
            const existeDeja = await verificationDoublon(nom);
            if (existeDeja) {
                errors.push("Une matière du même nom existe déjà.");
            }

            if ( !req.files || Object.keys(req.files).length === 0 )
            {
                errors.push("Aucun image uploadé.");
            }

            const image = req.files.imageMatiere;
            const cheminImage ="images/matieres";
            image.mv( path.join( "uploads/" + cheminImage, image.name), (error) => console.log(error) );
            const file_url = BASE_URL + "/" + cheminImage + "/" + image.name ;

            // Vérifier si l'utilisateur avec l'ID idProf existe dans la base de données et a le rôle de professeur
            const professeur = await User.findOne({ _id: idProf, role: 'professeur' });
            if (!professeur) {
                errors.push("Le professeur saisi ne correspond pas à un profil professeur.");
            }

            if (errors.length > 0){
                return res.json({ errors,status:400 });
            }else {
                // Créer la matière avec le professeur associé
                const nouvelleMatiere = new Matiere({
                    nom,
                    imageMatiere:file_url,
                    idProf
                });

                // Créer la matière
                const matiereEnregistree = await nouvelleMatiere.save();
                return res.status(200).json({
                    message: "Matière créée avec succès!",
                    data: matiereEnregistree
                });
            }

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
            const { nom, idProf } = req.body;
            const errors = [];
            // Verification du champ nom
            if (!nom || !nom.trim()) {
                errors.push("Le nom de la matière est requis.");
            }

            // Verification du champ idProf
            if (!idProf || !idProf.trim()) {
                errors.push("Le professeur est requis.");
            }

            // Check si l'ID du professeur is ObjectId valide
            if (!Utils.isValidObjectId(idProf)) {
                errors.push("L'ID du professeur n'est pas valide.");
            }

            const matiereResult = await Matiere.findOne({ id: id });

            // Check si Matiere existe
            if (!matiereResult) {
                errors.push("La matière n'existe pas !");
            }

            // Check Doublon
            const existeDeja = await verificationDoublonUpdate(id,nom);
            if (existeDeja) {
                errors.push("Une matière du même nom existe déjà.");
            }

            let file_url = matiereResult.imageMatiere;

            // Verifier si une nouvelle image importer
            if (req.files && req.files.imageMatiere) {
                const image = req.files.imageMatiere;
                const cheminImage ="images/matieres";
                image.mv(path.join("uploads/" + cheminImage, image.name), (error) => console.log(error));
                file_url = BASE_URL + "/" + cheminImage + "/" + image.name ;
            }
            // Check et mise a jour de l'ID du professeur
            const professeur = await User.findOne({ _id: idProf, role: 'professeur' });
            if (!professeur) {
                errors.push("Le professeur saisi ne correspond pas à un profil professeur.");
            }

            if (errors.length > 0){
                return res.json({ errors,status:400 });
            }else{
                // Mettre a jour Matière
                matiereResult.nom = nom;
                matiereResult.imageMatiere = file_url;
                matiereResult.idProf = idProf;

                // Save modifications
                const matiereMiseAJour = await matiereResult.save();
                return res.status(200).json({
                    message: "Matière mise à jour avec succès!",
                    data: matiereMiseAJour
                });
            }

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