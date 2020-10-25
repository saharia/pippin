
const Util = require('../../util');

let save = async (data) => {
  return Util.addBook(data);
}

let update = async (data) => {
  return Util.updateBook(data);
}

let remove = async (data) => {
  return Util.removeBook(data);
}

let find = async () => {
  return Util.findAll();
}

let saveToDatabase = async () => {
  return await Util.saveToDatabase();
}

module.exports = {
  save,
  update,
  find,
  saveToDatabase,
  remove
}