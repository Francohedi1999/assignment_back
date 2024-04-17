const Matiere = require('../models/matiere.model');
const User = require('../models/User.model');
const authMiddleware = require('../middleware/checkAuth');

// Creer Matiere
exports.createMatiere = [
    authMiddleware.verifierAutorisation('Administrateur'),
    async (req, res) => {
        try {
            const { nom, imageMatiere, idProf } = req.body;

            // Vérifier si l'utilisateur avec l'ID idProf existe dans la base de données et a le rôle de professeur
            const professeur = await User.findOne({ _id: idProf, role: 'professeur' });
            if (!professeur) {
                return res.status(400).json({ message: "L'ID du professeur est invalide ou ne correspond pas à un profil de professeur." });
            }

            // Créer la matière avec le professeur associé
            const nouvelleMatiere = new Matiere({
                nom,
                imageMatiere,
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
