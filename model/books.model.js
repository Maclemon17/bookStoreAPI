const mongoose = require("mongoose");

// create book schema 
const bookSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
});

// Create Book Model
const bookModel = mongoose.model("books_collections", bookSchema);


module.exports = bookModel;