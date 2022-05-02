const router = require('express').Router();
const books = require('./book_dumb');

let bookslibrary = books;


router.get('/books',function(req,res){
    res.send(bookslibrary);
});

router.get('/books/:id',function(req,res){

});

router.post('/books',function(req,res){

});

router.put('/books/:id',function(req,res){

});

router.delete('/books/:id',function(req,res){

});
module.exports=router;
