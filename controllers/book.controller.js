const bookModel = require("../model/books.model");

//Create new book
const addBook = (req, res) => {
    const { title, author, description, category, purchaseCount, imageUrl, tags } = req.body;
    console.log(!Object.keys(req.body).length)

    // check if request is not an empty object
    if (!Object.keys(req.body).length) {
        res.status(500).send({ message: "request is empty", status: false });
    } else {
        // check if book is already present
        bookModel.findOne({ title: title }, (err, found) => {
           /*  if (err) {
                res.status(500).send({ message: "Internal server error", status: false, err })
            } else */ if (found) {
                res.send({ message: "Book already exists", status: false });
            } else {
                // save book
                const newBook = new bookModel(req.body);

                newBook.save(err => {
                    if (err) {
                        res.status(500).send({ message: "Internal server error", status: false, err });
                    } else {
                        res.status(200).send({ message: "Book added successfully", status: true });
                    }
                });
            }
        })
    }

}


// fetch all books
const getAllBooks = (req, res) => {
    bookModel.find({}, (err, books) => {
        if (err) {
            res.status(500).send({ message: err, status: true });
        } else {
            res.status(200).send({ books, status: true });
        }
    });
};

// fetch a single book
const getBook = (req, res) => {
    const id = req.params.id;
    console.log(id)

    bookModel.findOne({ _id: id }, (err, book) => {
        if (err) {
            res.status(500).send({ message: err.name, status: false });
        } else if (!book) {
            res.status(404).send({ message: "Book not found", status: false })
        } else {
            res.status(200).send({ book, status: true });
        }
    });
}

// update a single book
const updateBook = (req, res) => {

}

// delete a single book
const deleteBook = (req, res) => {

}



module.exports = {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}