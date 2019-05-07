const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/user");
const config = require("../config/config");

router.post("/", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: "Le champ utilisateur ou password est vide",
      token: undefined
    });
  }

  const hasLowerCase = str => /\b([a-z]+)\b/.test(str);

  if (!hasLowerCase(req.body.username)) {
    res.status(400).json({
      error:
        "Votre identifiant ne doit contenir que des lettres minuscules non accentuées",
      token: undefined
    });
  }

  if (req.body.username.length < 2 || req.body.username.length > 20) {
    res.status(400).json({
      error: "Votre identifiant doit contenir entre 2 et 20 caractères",
      token: undefined
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
          token: undefined
        });
      }
      if (user.authenticate(req.body.password, user.password)) {
        jwt.sign(
          { userID: user._id },
          process.env.JWT_KEY || "x",
          { expiresIn: "1d" },
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
});

module.exports = router;
