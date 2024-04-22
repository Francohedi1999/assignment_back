// authMiddleware.js
    const allRoles = require('../config/roles.config');

    // Verifier si l'action est autorise pour l'utilisateur
    function verifierAutorisation(roleAutoriser) {
        return function(req, res, next) {
            // const userRole = req.user.role;
            const userRole = 'administrateur';

            if (!allRoles.roles.hasOwnProperty(userRole) && allRoles.roles[userRole] !== roleAutoriser) {
                return res.status(403).json({ message: "Vous n'avez pas l'autorisation pour cette action." });
            }

            next();
        };
    }

    module.exports = {
        verifierAutorisation
    };