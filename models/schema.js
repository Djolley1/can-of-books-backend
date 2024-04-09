const mongoose = require('mongoose');

// Schema = Shape of the data
// We don't need an "id" because the database will create one for us.
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});

module.exports = bookSchema;
