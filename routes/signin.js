var express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();
const User = require('../model/user');
const config = require('../config/config');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('connction');
});



/* Post  home page. */
router.post('/', function(req, res, next) {

    if (!req.body.username || !req.body.password) {
        //Le cas où l'username ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            username: req.body.username
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
                    jwt.sign({username:req.body.username},config.secret,{expiresIn:'20min'},(err,token)=>{
                        res.status(200).json({
                            token: token,
                            "text": "Authentification réussi"
                        })
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
