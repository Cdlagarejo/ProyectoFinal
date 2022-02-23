const express = require('express');
const Book  = require('./controller/book.controller.js');
const valid_auth = require('../../middleware/valid_auth.js');
const {Router} = express;
const router = Router();

router.post('/insert',valid_auth,async (req,res) => {
    const book = new Book();
    const {author,isbn,publication_date,title} = req.body;
    const response = await book.insert({author,isbn,publication_date,title});

    if(response.code == undefined) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.put('/update',valid_auth,async (req,res) => {
    const book = new Book();
    const {id,author,isbn,publication_date,title} = req.body;
    const response = await book.update({id,author,isbn,publication_date,title});

    if(response.code == undefined) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.delete('/delete',valid_auth, async (req,res) => {
    const book = new Book();
    const {id} = req.body;
    const response = await book.delete(id);

    if(response.code == undefined) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.get('/get_all',async (req,res) => {
    const book = new Book();

    const response = await book.get_all();

    if(response.code == undefined) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


router.get('/get_by_id/:id',async (req,res) => {
    const book = new Book();
    const {id} = req.params;
    const response = await book.get_by_id(id);

    if(response.code == undefined) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

module.exports = router;