# Gestion des Assignments - Projet Mbds 2024 (Back)

![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)    ![Express.js](https://img.icons8.com/color/48/000000/express.png)    ![Angular](https://img.icons8.com/color/48/000000/angularjs.png)    ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)


Ce projet est une API backend développée en MEAN Stack (MongoDB, Express.js, Angular, Node.js) pour la gestion des assignments dans un environnement éducatif.

## Déploiement

La version déployée de l'API est accessible à l'adresse suivante : [Lien de déploiement](https://assignment-back-5bbq.onrender.com/)

## Auteurs

- 21 - RAKOTOBE Herinirina Angelo
- 30 - RAMAROTAFIKA Hedi Franco

## Description

L'API fournit les fonctionnalités nécessaires pour gérer les utilisateurs, les matières, les assignments, et les notes au sein d'une application éducative. 
Elle permet aux administrateurs de gérer les utilisateurs et les matières, 
aux enseignants de créer et noter des devoirs, et aux étudiants de soumettre et consulter leurs devoirs. 
L'authentification est gérée à l'aide de JSON Web Tokens (JWT), assurant une sécurité robuste et un contrôle d'accès efficace.

## Fonctionnalités

- **Gestion des utilisateurs** : Création, mise à jour, et suppression des utilisateurs.
- **Gestion des matières** : Ajout, modification, et suppression des matières.
- **Gestion des devoirs** : Création, consultation, et notation des devoirs.
- **Gestion des notes** : Attribution et consultation des notes par les étudiants et les enseignants.

## Modèles de données

Les modèles de données suivants sont utilisés :

- **Assignments** : Pour gérer les devoirs.
- **Matieres** : Pour gérer les matières.
- **NoteEtudiants** : Pour gérer les notes des étudiants.
- **Users** : Pour gérer les informations des utilisateurs.

## Routes API

Les routes suivantes sont disponibles :

- `/user` : Routes pour la gestion des utilisateurs.
- `/matieres` : Routes pour la gestion des matières.
- `/auth` : Routes pour l'authentification.
- `/assignment` : Routes pour la gestion des devoirs.
- `/note` : Routes pour la gestion des notes.

Chaque route utilise des middlewares pour la vérification des tokens et des autorisations.


