const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controllers');
// Retrieve all books
router.get('/', bookController.findAll);
// Create a new book
router.post('/create', bookController.create);
// Update a book with id
router.patch('/update', bookController.update);
// Save book in DB
router.put('/save', bookController.saveToDB);
// Delete a book with id
router.delete('/:id', bookController.remove);
module.exports = router