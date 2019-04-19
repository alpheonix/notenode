const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/user");
const config = require("../config/config");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("connction");
});

/* Post  home page. */
<<<<<<< HEAD
router.post('/', (req, res) => {

    if (!req.body.username || !req.body.password) {
    res.status(400).send("Le champ utilisateur ou password est vide");
    }

    const hasLowerCase = (str) => (/\b([a-z]+)\b/.test(str));

    if(!hasLowerCase(req.body.username)){
        res.status(400).send("Votre identifiant ne doit contenir que des lettres minuscules non accentuées")
    }

    if(req.body.username.length < 2 || req.body.username.length > 20){
        res.status(400).send("Votre identifiant doit contenir entre 2 et 20 caractères")
    }

    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            res.status(500).send("Erreur interne");
        }
        if(!user){
            res.status(401).send("Cet identifiant est inconnu");
        } else {
          if (user.authenticate(req.body.password, user.password)) {
            jwt.sign({userId: user._id}, config.secret, {expiresIn: '20min'}, (err, token) => {
              res.status(200).json({
                "token": token,
                "text": "Authentification réussi"
              });
            });
          } else {
            res.status(401).send("Le mot de passe est incorrect");
          }
        }
    })

=======
router.post("/", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: "Le champ utilisateur ou password est vide",
      token: undifined
    });
  }

  const hasLowerCase = str => /\b([a-z]+)\b/.test(str);

  if (!hasLowerCase(req.body.username)) {
    res.status(400).json({
      error:
        "Votre identifiant ne doit contenir que des lettres minuscules non accentuées",
      token: undifined
    });
  }

  if (req.body.username.length < 2 || req.body.username.length > 20) {
    res.status(400).json({
      error: "Votre identifiant doit contenir entre 2 et 20 caractères",
      token: undifined
    });
  }

  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) {
        res.status(500).send("Erreur interne");
      }
      if (!user) {
        res.status(403).send({
          error: "Cet identifiant est inconnu",
          token: undifined
        });
      }
      if (user.authenticate(req.body.password, user.password)) {
        jwt.sign(
          { userID: user._id },
          config.secret,
          { expiresIn: "20min" },
          (err, token) => {
            res.status(200).json({
              error: null,
              token: token
            });
          }
        );
      } else {
        res.status(403).json("Le mot de passe est incorrect");
      }
    }
  );
>>>>>>> dc7bf1571992a90b04901cc3fe06fdeb0d61b16b
});

module.exports = router;
