const router = require('express').Router();
const books = require('./book_library');

let bookslibrary = books;


router.get('/books', function (req, res) {
    res.send(bookslibrary);
});

router.get('/books/:id', function (req, res) {
    //this is for point out the id from url
    const { id } = req.params;

    //searching the book by find through checking the isbn which is like a id 
    const book = bookslibrary.find(b => b.isbn === id);
    //if book is not find then we will return a 406 error to user
    if (!book) return res.status(406).send('Books does not exist');
    //else we send the detail of the books
    res.send(book);
});

router.post('/books', function (req, res) {
    //setting the input creteria for posting the details of the books 
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    //for checking that whether book already exist or not
    const bookExist = bookslibrary.find(b => b.isbn === isbn);
    if (bookExist) return res.send('books already exist');


    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    };

    bookslibrary.push(book);
    res.send(book);

});

router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    //for checking that whether book already exist or not
    const book = bookslibrary.find(b => b.isbn === id);
    if (!book) return res.send('books does not  exist');

    //setting the update field for updating the require field
    const updateField = (val, prev) => !val ? prev : val;

    //updating the books value 
    const updateBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories)
    };
    const bookIndex = bookslibrary.findIndex(b => b.isbn === id);
    bookslibrary.splice(bookIndex, 1, updateBook);
    res.send(updateBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;
    let book = bookslibrary.find(b => b.isbn === id);
    if (!book) return res.status(404).send('books does not exist');
    bookslibrary = bookslibrary.filter(b => b.isbn !== id);
    res.send('success');
});
module.exports = router;
