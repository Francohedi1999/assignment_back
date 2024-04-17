const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiere.controller');

// Créer une matière (accessible uniquement par l'administrateur)
router.post('/', matiereController.createMatiere);

module.exports = router;
