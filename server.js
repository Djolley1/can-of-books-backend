'use strict';

require('dotenv').config();
const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

app.use(cors());

// Handle the default route
app.get('/', (request, response) => {
  response.json({message: 'This is the book server'});
});

app.get('/books', handleGetBooks);
app.get('/books/seed', seedDatabase);
app.get('/books/nuke', emptyDatabase);

// Handle all unknown routes
app.get('*', (request, response) => {
  response.status(404).json({message: 'Not Found'});
});

// Handle all errors
app.use((error, request, response) => {
  console.error(error);
  response.status(500).json({message: 'Internal Server Error'});
});

// Round Handlers ...
async function handleGetBooks(request, response) {
  // Get all the dogs from the database
//   let filterQuery = {};
  const books = await Book.find();
  response.json(books);
}

async function seedDatabase(request, response) {
  let results = await Book.seed();
  response.send({message: results});
}

async function emptyDatabase(request, response) {
  let results = await Book.clear();
  response.json({message: results});
}

// Connect to the database and start the server
function startServer() {
  const PORT = process.env.PORT || 3000;
  const DATABASE_URL = process.env.DATABASE_URL;
  console.log('Database', DATABASE_URL);
  mongoose.connect(DATABASE_URL);
  app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
}

startServer();

