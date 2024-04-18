const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiere.controller');

// Creer Matiere (Admin)
router.post('/', matiereController.createMatiere);
// Read Matiere (Admin)
router.get('/', matiereController.getAllMatieres);
router.get('/:id', matiereController.getMatiereById);
// Update Matiere (Admin)
router.put('/:id', matiereController.updateMatiere);
// Delete Matiere (Admin)
router.delete('/:id', matiereController.deleteMatiere);

module.exports = router;
