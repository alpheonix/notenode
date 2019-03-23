var express = require('express');
var router = express.Router();
const User = require('../model/user');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('connction');
});



/* Post  home page. */
router.post('/', function(req, res, next) {

    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
            else if(!user){
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "text": "Authentification réussi"
                    })
                }
                else{
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
});





module.exports = router;
