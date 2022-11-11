const express = require("express");
const { addBook, getAllBooks, getBook, updateBook, deleteBook } = require("../controllers/book.controller");


const router = express.Router();

router.post("/book", addBook);              // ADD ANEW BOOK
router.get('/books', getAllBooks);          // GET ALL BOOKS
router.get('/book/:id', getBook);           // GET A SINGLE BOOK
router.put('/book/:id', updateBook);        // UPDATE A SINGLE BOOK
router.delete('/book/:id', deleteBook);     // DELETE A SINGLE BOOK    



module.exports = router;