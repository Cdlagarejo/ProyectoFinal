const express = require('express');
const book_review  = require('./controller/book_review.controller.js');
const valid_auth = require('../../middleware/valid_auth.js');
const {Router} = express;
const router = Router();

router.post('/create', valid_auth, async (req,res) => {
    const Book_review = new book_review();

    const {id_user,id_review,score} = req.body;
    const response  = await Book_review.create_library({id_user,name_library});   

    if (!response.code) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


 
module.exports = router;