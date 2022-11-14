const express = require("express");
const { addBook, getAllBooks, getBook, updateBook, deleteBook } = require("../controllers/book.controller");


const router = express.Router();

router.post("/books", addBook);              // ADD ANEW BOOK
router.get('/books', getAllBooks);          // GET ALL BOOKS
router.get('/books/:id', getBook);           // GET A SINGLE BOOK
router.put('/books/:id', updateBook);        // UPDATE A SINGLE BOOK
router.delete('/books/:id', deleteBook);     // DELETE A SINGLE BOOK    



module.exports = router;