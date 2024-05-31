require('mongoose') ;
require("dotenv").config();

const path = require("path") ;
const bcrypt = require("bcrypt") ;
const User_Model = require("../models/User.model") ;
const Assignment_Model = require("../models/Assignment.model") ;
const Note_Etudiant_model = require("../models/Note_Etudiant.model") ;
const BASE_URL = process.env.BASE_URL ; 

const users = [
    {
      "nom": "Phyllys",
      "prenom": "Linebarger",
      "email": "plinebarger0@redcross.org",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student1.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Georgeta",
      "prenom": "Platfoot",
      "email": "gplatfoot1@disqus.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student2.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Design"
    },
    {
      "nom": "Harlene",
      "prenom": "Buffey",
      "email": "hbuffey2@japanpost.jp",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student3.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Elisha",
      "prenom": "Merrin",
      "email": "emerrin3@aboutads.info",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student4.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Vania",
      "prenom": "Peacop",
      "email": "vpeacop4@deviantart.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student5.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Binni",
      "prenom": "Magor",
      "email": "bmagor5@rediff.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student6.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Design"
    },
    {
      "nom": "Nicholle",
      "prenom": "Carson",
      "email": "ncarson6@twitter.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student7.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Jordanna",
      "prenom": "Kleinberer",
      "email": "jkleinberer7@reverbnation.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student8.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Annamaria",
      "prenom": "Ferrao",
      "email": "aferrao8@buzzfeed.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student9.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Laraine",
      "prenom": "Risborough",
      "email": "lrisborough9@ucla.edu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student10.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Lucilia",
      "prenom": "Bursnall",
      "email": "lbursnalla@etsy.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student11.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Chery",
      "prenom": "Luckett",
      "email": "cluckettb@intel.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student12.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Rosana",
      "prenom": "Cyster",
      "email": "rcysterc@state.tx.us",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student13.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Bebe",
      "prenom": "Bodycomb",
      "email": "bbodycombd@mac.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student14.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Keeley",
      "prenom": "Fruish",
      "email": "kfruishe@de.vu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student15.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Jami",
      "prenom": "Jillions",
      "email": "jjillionsf@wikipedia.org",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student16.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Ingrid",
      "prenom": "Timmins",
      "email": "itimminsg@bbb.org",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student17.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Rozella",
      "prenom": "Dupre",
      "email": "rdupreh@live.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student18.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Nonie",
      "prenom": "Rey",
      "email": "nreyi@toplist.cz",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student19.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Sofia",
      "prenom": "Cecchi",
      "email": "scecchij@issuu.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student20.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Informatique"
    },
    {
      "nom": "Ebonee",
      "prenom": "Carff",
      "email": "ecarffk@toplist.cz",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student1.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Garland",
      "prenom": "Wintersgill",
      "email": "gwintersgilll@eepurl.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student2.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Fifi",
      "prenom": "Ferre",
      "email": "fferrem@discuz.net",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student3.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 MBDS"
    },
    {
      "nom": "Ibby",
      "prenom": "O'Scollain",
      "email": "ioscollainn@discuz.net",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student4.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Design"
    },
    {
      "nom": "Petronilla",
      "prenom": "Craigheid",
      "email": "pcraigheido@myspace.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student5.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Gertruda",
      "prenom": "Battle",
      "email": "gbattlep@webnode.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student6.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Dorise",
      "prenom": "Mostyn",
      "email": "dmostynq@jiathis.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student7.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Lois",
      "prenom": "Batram",
      "email": "lbatramr@csmonitor.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student8.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 MBDS"
    },
    {
      "nom": "Cleo",
      "prenom": "Ollet",
      "email": "collets@deviantart.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student9.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Dorthea",
      "prenom": "Bussy",
      "email": "dbussyt@multiply.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student10.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Harmonia",
      "prenom": "Brunetti",
      "email": "hbrunettiu@alexa.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student11.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Vittoria",
      "prenom": "Waything",
      "email": "vwaythingv@wufoo.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student12.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Yoshiko",
      "prenom": "Poulsom",
      "email": "ypoulsomw@arizona.edu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student13.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Shelby",
      "prenom": "Binham",
      "email": "sbinhamx@free.fr",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student14.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Informatique"
    },
    {
      "nom": "Cristie",
      "prenom": "McKerton",
      "email": "cmckertony@arstechnica.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student15.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 MBDS"
    },
    {
      "nom": "Bebe",
      "prenom": "Claypoole",
      "email": "bclaypoolez@rediff.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student16.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Candida",
      "prenom": "Stubbington",
      "email": "cstubbington10@delicious.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student17.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 MBDS"
    },
    {
      "nom": "Lane",
      "prenom": "Harme",
      "email": "lharme11@arizona.edu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student18.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Elisabetta",
      "prenom": "Kaspar",
      "email": "ekaspar12@google.es",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student19.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Reine",
      "prenom": "Tullett",
      "email": "rtullett13@wikimedia.org",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student20.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Marian",
      "prenom": "Ozanne",
      "email": "mozanne14@businessweek.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student1.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Gabie",
      "prenom": "Ridgley",
      "email": "gridgley15@seattletimes.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student2.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Anetta",
      "prenom": "Slogrove",
      "email": "aslogrove16@forbes.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student3.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Edwina",
      "prenom": "Woolam",
      "email": "ewoolam17@answers.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student4.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Design"
    },
    {
      "nom": "Valina",
      "prenom": "Gotcher",
      "email": "vgotcher18@yelp.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student5.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Barbee",
      "prenom": "Ofen",
      "email": "bofen19@lulu.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student6.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 MBDS"
    },
    {
      "nom": "Pru",
      "prenom": "Cornhill",
      "email": "pcornhill1a@census.gov",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student7.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Mufinella",
      "prenom": "Edel",
      "email": "medel1b@china.com.cn",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student8.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Mathématiques"
    },
    {
      "nom": "Jo ann",
      "prenom": "Camamile",
      "email": "jcamamile1c@list-manage.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student9.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Saidee",
      "prenom": "Seyffert",
      "email": "sseyffert1d@linkedin.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student10.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L3 Informatique"
    },
    {
      "nom": "Shanta",
      "prenom": "Senior",
      "email": "ssenior1e@deliciousdays.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student11.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    },
    {
      "nom": "Krystyna",
      "prenom": "Ulyet",
      "email": "kulyet1f@imgur.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student12.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Design"
    },
    {
      "nom": "Shanta",
      "prenom": "Eastwood",
      "email": "seastwood1g@reddit.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student13.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Informatique"
    },
    {
      "nom": "Hinda",
      "prenom": "Greenham",
      "email": "hgreenham1h@gravatar.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student14.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Leora",
      "prenom": "Philbrick",
      "email": "lphilbrick1i@biglobe.ne.jp",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student15.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Darcey",
      "prenom": "Molfino",
      "email": "dmolfino1j@tamu.edu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student16.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L1 Design"
    },
    {
      "nom": "Teirtza",
      "prenom": "O'Coskerry",
      "email": "tocoskerry1k@arizona.edu",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student17.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Informatique"
    },
    {
      "nom": "Aliza",
      "prenom": "Warden",
      "email": "awarden1l@nature.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student18.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M1 Informatique"
    },
    {
      "nom": "Randie",
      "prenom": "Steptow",
      "email": "rsteptow1m@tripadvisor.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student19.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "L2 Informatique"
    },
    {
      "nom": "Cathrin",
      "prenom": "Jerrim",
      "email": "cjerrim1n@patch.com",
      "password": "$2b$10$6EBVVrjV.zDxljKPRMsNeO99PENZNCnyvMEqNqu6la0VlaNLTPuy.",
      "img_url": "http://localhost:3000/images_users/student20.JPG",
      "role": "Etudiant",
      "deleted": false,
      "niveau": "M2 BIHAR"
    }
  ]

create_user = async ( req , res ) => 
{
    try
    {
        const user = await User_Model.findOne({ email: req.body.email }) ;
        if( user )
        {
            return res.status(200).json( { message: "Cet utilisateur existe déjà" , created : false } ) ;
        }

        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            return res.status(200).json( { message: "Aucun image uploadé." , created : false } ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;

        const password_ = await bcrypt.hash( req.body.password , 10 ) ;

        const new_utilisateur = await User_Model.create( {
            nom : req.body.nom ,
            prenom : req.body.prenom ,
            email : req.body.email ,
            password : password_ ,
            img_url : file_url ,
            role : req.body.role ,
            niveau : req.body.niveau || "",
            deleted : false ,
        } ) ;

        const assignments = await Assignment_Model.find({ niveau: new_utilisateur.niveau });

        if( assignments.length !== 0 )
        {
            const promises = assignments.map( assignment => 
                Note_Etudiant_model.create( {
                                                assignment_id: assignment._id,
                                                etudiant_id: new_utilisateur._id,
                                                note: 0,
                                                rendu: false,
                                                noted: false
                                            })
            );
            await Promise.all(promises);
        }

        return res.status(200).json( { message: "L'utilisateur a été bien ajoutée" , created : true  } ) ;

    } 
    catch( error )
    {
        console.log("");
        console.log("Erreur create user");
        console.log(error);
        console.log("");

        return res.status(400).json( error ) ; 
    }
} ;

get_utilisateur_no_pagination = async ( req , res ) =>
{
    try
    {
        const role_filtre = req.query.filtre_role ;
        if( !role_filtre )
        {            
            const users = await User_Model.find() ;
            return res.status(200).json( users ) ;
        }
        const regex = new RegExp(role_filtre, 'i'); // Une expression régulière pour ignorer la casse
        const users_filtred = await User_Model.find( { role: regex} ) ;
        return res.status(200).json( users_filtred ) ;
    }
    catch (error) 
    {
        return res.status(400).json( { message: error } )
    } 
}

get_all_utilisateur = async ( req , res ) =>
{
    try
    {
        let aggregate_query = User_Model.aggregate() ;

        const role_filtre = req.query.filtre_role ;
        const niveau_filtre = req.query.niveau_filtre ;

        if( role_filtre )
        {            
            aggregate_query.match({ role: role_filtre });
        }

        if( niveau_filtre )
        {            
            aggregate_query.match({ niveau: niveau_filtre });
        }

        const options = 
        {
            page: parseInt(req.query.page) || 1 ,
            limit: parseInt(req.query.limit) || 10
        };

        User_Model.aggregatePaginate(aggregate_query, options, ( error , data ) => 
        {
            if (error) 
            {
                console.log(error);
            } 
            else 
            {
                return res.status(200).json( data ) ;
            }
        });
    }
    catch (error) 
    {
        console.log( error )
        return res.status(400).json( { message: error } )
    } 
} ;

get_utilisateur_by_id = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;
                
        return res.status(200).json( utilisateur ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

update_user_by_id = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id_user ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }
        
        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            const update = {
                nom: req.body.nom ,
                prenom: req.body.prenom ,
                email: req.body.email ,
                niveau: req.body.niveau || "" ,
                role: req.body.role ,
                img_url: req.body.img_url
            }
    
            await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
            return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;
 
        const update = {
            nom: req.body.nom ,
            prenom: req.body.prenom ,
            email: req.body.email ,
            niveau: req.body.niveau || "" ,
            role: req.body.role ,
            img_url: file_url
        }

        await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
        return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

update_profil = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id_user ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }
        
        const password_ = await bcrypt.hash( req.body.password , 10 ) ;

        if ( !req.files || Object.keys(req.files).length === 0 ) 
        {
            const update = {
                nom: req.body.nom ,
                prenom: req.body.prenom ,
                password: password_ ,
                img_url: req.body.img_url
            }
    
            await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
            return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
        }

        const image = req.files.image;
        image.mv( path.join( "uploads/images_users", image.name), (error) => console.log(error) );
        const file_url = BASE_URL + "/images_users/" + image.name ;

        const update = {
            nom: req.body.nom ,
            prenom: req.body.prenom ,
            password: password_ ,
            img_url: file_url
        }

        await User_Model.findOneAndUpdate( { _id: id_utilisateur } , update , { new: true } );                    
        return res.status(200).json( { message: "Utilisateur modifié avec succès" , updated: true} ) ;
    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

delete_or_restore_utilisateur = async ( req , res ) =>
{
    try
    {  
        const id_utilisateur = req.params.id_user ;
        const utilisateur = await User_Model.findById( id_utilisateur ) ;

        if( !utilisateur )
        {
            return res.status(200).json( { message: "Utilisateur non trouvé" , updated: false } ) ;
        }

        if( utilisateur.deleted === true )
        {
            await User_Model.findByIdAndUpdate(
                id_utilisateur , 
                { deleted: false } ,
                { new: true }
            );
            return res.status(200).json( { message : "L'utilisateur a été bien restaurée" } ) ;
        }
        else
        {
            await User_Model.findByIdAndUpdate(
                id_utilisateur , 
                { deleted: true  }  ,
                { new: true }
            );        
            return res.status(200).json( { message : "L'utilisateur a été bien supprimée" } ) ;
        }

    } 
    catch( error )
    {
        return res.status(400).json( error ) ; 
    }
}

get_user_logged = async ( req , res , next ) => 
{
    try  
    {
        const user_logged = await User_Model.findById( req.user._id ) ;
        return res.status(200).json( user_logged ) ;
    } 
    catch (error) 
    {
        return res.status(400).json( { message: error } )
    }   
} ;

module.exports = { create_user , 
    get_user_logged ,
    get_all_utilisateur , 
    get_utilisateur_by_id , 
    update_user_by_id , 
    update_profil ,
    get_utilisateur_no_pagination ,
    delete_or_restore_utilisateur }