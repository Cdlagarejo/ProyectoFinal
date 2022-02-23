const express = require('express');
const _jwt = require('jsonwebtoken');
const {jwt} = require('../conf.js')

const {Router} = express;
const router_valid_auth = Router();


let middleware_valid_auth = router_valid_auth.use((req,res,next) => {

    const token = req.headers['authorization'];

    if (token) {
        _jwt.verify(token,jwt.public_key,(err,decoded) => {
            if (err){
                return res.status(401).json({mensaje : 'Token Invalido'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({mensaje : 'No se envia un token'});
    }

});

module.exports  = middleware_valid_auth;

