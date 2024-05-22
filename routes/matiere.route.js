const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiere.controller');
const { get_token } = require( "../controllers/Auth.controller" ) ;
const {verifierAutorisation} = require('../middleware/checkAuth');
const {roles} = require('../config/roles.config');
const { etudiant, professeur, administrateur } = roles;

// Roles autoriser pour chaque route
const rolesAutoriserPourCreation = [administrateur, professeur];
const rolesAutoriserPourLecture = [administrateur,professeur,etudiant];
const rolesAutoriserPourModification = [administrateur, professeur];
const rolesAutoriserPourSuppression = [administrateur];

// Creer Matiere (Admin)
router.post('/', [ get_token , verifierAutorisation(rolesAutoriserPourCreation), matiereController.createMatiere ]);
// Read Matiere (Admin)
router.get('/', [ get_token , verifierAutorisation(rolesAutoriserPourLecture), matiereController.getAllMatieres ]);
router.get('/:id', [ get_token , verifierAutorisation(rolesAutoriserPourLecture),matiereController.getMatiereById ]);
// Update Matiere (Admin)
router.put('/:id', [ get_token , verifierAutorisation(rolesAutoriserPourModification),matiereController.updateMatiere ]);
// Delete Matiere (Admin)
router.delete('/:id', [ get_token , verifierAutorisation(rolesAutoriserPourSuppression),matiereController.deleteMatiere ]);

module.exports = router;
