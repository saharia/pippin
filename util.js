
let books = [];

const ModuleNotFound = require('./src/exception/module.not.found');
const InvalidForm = require('./src/exception/invalid.form');

let addBook = async (data) => {
  let isExists = isBookExists(data.book, -1);
  if(isExists) {
    throw new InvalidForm('Book name already exists');
  }
  books.push(data.book);
}

let saveToDatabase = async () => {
  let response = {};
  for(let i = 0; i < books.length; i++) {
    let data = await saveBook(books[i]);
    response[data.title] = data.time;
  }
  return response;
}

let saveBook = (book) => {
  return new Promise((resolve, reject) => {
    let time = Math.random(book.length) * 1000;
    setTimeout(() => {
      resolve({ title: book, time });
    }, time);
  });
}


let updateBook = async (data) => {
  let isOldExists = isBookExists(data.original_book, -1);
  if(!isOldExists) {
    throw new ModuleNotFound('Book not found');
  }

  let currentIndex = books.findIndex((val) => { return val == data.original_book });
  let isNewExists = isBookExists(data.new_book, currentIndex);
  if(isNewExists) {
    throw new InvalidForm('Book new book name already exists');
  }
  books[currentIndex] = data.new_book;
}


let removeBook = async (data) => {
  let isExists = isBookExists(data.book);
  if(!isExists) {
    throw new ModuleNotFound('Book not found');
  }
  books.splice(books.indexOf(data.book), 1);
}

let findAll = async () => {
  return getBookList(books, 0, '');
}

let isBookExists = (book, book_index) => {
  return books.indexOf(book) > -1 && books.indexOf(book) != book_index;
  /* let isExists = books.filter((val, index) => { return book_index != index && val == book });
  if(isExists && isExists[0]) {
    return true;
  }
  return false; */
}

let getBookList = (books, index, data) => {
  if(books[index]) {
    data = data + (data != '' ? ', ' : '') + getBookList(books, index + 1, books[index]);
  }
  return data;
}

module.exports = {
  addBook,
  findAll,
  updateBook,
  saveToDatabase,
  removeBook
}