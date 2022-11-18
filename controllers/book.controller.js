const bookModel = require("../model/books.model");

//Create new book
const addBook = (req, res) => {
    const { title } = req.body;
    console.log(!Object.keys(req.body).length)

    // check if request is not an empty object
    if (!Object.keys(req.body).length) {
        res.status(500).send({ message: "request is empty", status: false });
    } else {
        // check if book is already present
        bookModel.findOne({ title: title }, (err, found) => {
            if (err) {
                res.status(500).send({ message: "Internal server error", status: false, err })
            } else if (found) {
                res.send({ message: `Book ${found.title} already exists`, status: false });
            } else {
                // save book
                const newBook = new bookModel(req.body);
                try {
                    newBook.save((err, result) => {
                        if (err) {
                            res.status(500).send({ message: "Internal server error", status: false, err });
                        } else {
                            res.status(200).send({ message: "Book added successfully", status: true, book: result });
                        }
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        });
    }

}


// fetch all books
const getAllBooks = (req, res) => {
    bookModel.find({}, (err, books) => {
        if (err) {
            res.status(500).send({ message: err, status: true });
        } else if (!books.length) {
            res.status(404).send({ message: "No record found, books is empty add books", status: false })
        } else {
            res.status(200).send({ message: "All books", total: books.length, books, status: true });
            // console.log(r)
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
            res.status(404).send({ message: "Book not found", status: false });
        } else {
            res.status(200).send({ book, status: true });
        }
    });
}

// update a single book
const updateBook = (req, res) => {
    const { title, author, description, category, purchaseCount, imageUrl, tags } = req.body;
    let update = {
        title: title,
        author: author,
        description: description,
        category: category,
        purchaseCount: purchaseCount,
        imageUrl: imageUrl,
        tags: tags
    }

    bookModel.findByIdAndUpdate(req.params.id, update, { new: true }, (err, book) => {
        if (err) {
            res.status(500).send({ message: "Internal server error", errMsg: err.name, status: false });
        } else if (!book) {
            res.status(404).send({ message: "Book not found!!", status: false });
        } else {
            book.save((err, result) => {
                if (err) {
                    res.status(400).send({ mesage: err, status: false });
                } else {
                    res.status(200).send({ message: "Book updated successfully!!", status: true, updatedBook: result });
                }
            });
        };
    });
}

// delete a single book
const deleteBook = (req, res) => {
    const id = req.params.id;
    bookModel.findByIdAndDelete(id, (err, book) => {
        if (err) {
            res.status(500).send({ message: err, status: false });
        } else if (!book) {
            res.status(404).send({ message: "Book not found!!", staus: false });
        } else {
            res.status(200).send({ message: "Book deleted successfully!!", status: true, book });
        }
    });
}



module.exports = {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
}