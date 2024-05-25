// authMiddleware.js
const allRoles = require('../config/roles.config');
const User_model = require('../models/User.model') ;


    // Verifier si l'action est autorise pour l'utilisateur
    function verifierAutorisation(roleAutoriser) {
        return async function (req, res, next) {
            try {
                const userId = req.user._id; // Get ID de l'utilisateur a partir du token
                const user = await User_model.findById(userId); // Rechercher l'utilisateur dans la bdd
                console.log(user);
                if (!user) {
                    return res.status(403).json({message: "Utilisateur non trouvé."});
                }
                const userRole = user.role.toLowerCase();
                roleAutoriser = roleAutoriser.map(role => role.toLowerCase());

                if (!allRoles.roles.hasOwnProperty(userRole) || !roleAutoriser.includes(userRole)) {
                    return res.status(403).json({message: "Vous n'avez pas le role requis pour effectuer cette action."});
                }
                next();
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };
    }

    module.exports = {
        verifierAutorisation
    };