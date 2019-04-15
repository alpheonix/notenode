const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const router = express.Router();

const Note = require('../models/notes');

router.put('/', verifyToken,(req, res) => {
    jwt.verify(req.token,config.secret,(err,authData)=>{
    if(err){
        res.status(403);
    }else{
        const note = Note({
            userId: req.body.userId,
            content: req.body.content,
          });
        
          note.save((result) => {
            res.send(result);
          });
    }
    });
});


router.get('/', verifyToken,(req, res) => {
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403);
        }else{
            Note.find((err, notes) => {
                res.send(notes)
              });
        }
        });
});

router.patch('/:id', verifyToken,function(req, res, next) {
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403);
        }else{
            if (!req.body.note || !req.param.id) {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                res.status(400).json({
                    "text": "Requête NON  valide"
                })
            } else {
                (async function (resolve, reject) {
                    await Note.update({ userID: req.param.id }, { content: req.body.note,lastUpdateAt: new Date() }, options, callback)
          
                }).then(function (error) {
                    switch (error) {
                        case 500:
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                            break;
                        case 204:
                            res.status(204).json({
                                "text": "L'adresse email existe déjà"
                            })
                            break;
                        default:
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                    }
                })
          
            }
        }
        });
    
  

});

router.delete('/:id', verifyToken,function(req, res, next) {
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403);
        }else{
            if (!req.param.id) {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                res.status(400).json({
                    "text": "Requête NON  valide"
                })
            } else {
                (async function (resolve, reject) {
                    await Note.deleteOne( { _id : ObjectId(req.param.id) } );
          
                }).then(function (error) {
                    switch (error) {
                        case 500:
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                            break;
                        case 204:
                            res.status(204).json({
                                "text": "L'adresse email existe déjà"
                            })
                            break;
                        default:
                            res.status(500).json({
                                "text": "Erreur interne"
                            })
                    }
                })
          
            }
        }
        });
  

});

function verifyToken(req,res,next){
    //recup auth header val
    const header = req.header['x-access-token'];
    if (typeof header!=='undefined'){
        const arr = header.split(' ');
        const token = arr[1];
        req.token = token;
        next();
    }else{
        res.status(403);
    }
}




module.exports = router;
