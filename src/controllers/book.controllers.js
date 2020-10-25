
const Book = require('../models/book.model.js');

let findAll = async (req, res) => {
  try {
    let books = await Book.find();
    res.send({ books: books });
  } catch (error) {
    res.status(error.status ? error.status : 500).send({ message: error.message || "Something went wrong while getting list of books." })
  }
}


let create = async (req, res) => {
  // Validate request
  if(!req.body || (req.body && !req.body.book)) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  try {
    let books = await Book.save(req.body);
    res.send({ message: 'Book saved successfully!' });
  } catch (error) {
    res.status(error.status ? error.status : 500).send({ message: error.message || "Something went wrong while insert book." })
  }
}

let update = async (req, res) => {
  // Validate request
  let isValid = true, message = '';
  if(!req.body) {
    isValid = false;
    message = "Please fill all required field";
  }

  if(!req.body.original_book) {
    isValid = false;
    message = "Please enter the original book";
  }

  if(!req.body.new_book) {
    isValid = false;
    message = "Please enter the update book";
  }

  if(!isValid) {
    return res.status(400).send({ message });
  }
  try {
    let books = await Book.update(req.body);
    res.send({ message: 'Book saved successfully!' });
  } catch (error) {
    res.status(error.status ? error.status : 500).send({ message: error.message || "Something went wrong while update book." })
  }
}

let remove = async (req, res) => {
  // Validate request
  if(!req.body || (req.body && !req.body.book)) {
    return res.status(400).send({ message: "Please fill all required field" });
  }
  try {
    let books = await Book.remove(req.body);
    res.send({ message: 'Book removed successfully!' });
  } catch (error) {
    res.status(error.status ? error.status : 500).send({ message: error.message || "Something went wrong while delete book." })
  }
}

let saveToDB = async (req, res) => {
  let response = await Book.saveToDatabase();
  res.send(response);
}

module.exports = {
  findAll,
  create,
  update,
  saveToDB,
  remove
}