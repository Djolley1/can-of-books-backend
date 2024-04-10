'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

app.use(cors());
app.use(express.json());

// Handle the default route
app.get('/', (request, response) => {
  response.json({ message: 'This is the book server' });
});

app.get('/books', handleGetBooks);
app.post('/books', handleCreateBook);
app.put('/books/:id', handleUpdateBook);
app.delete('/books/:id', handleDeleteBook);
app.get('/books/seed', seedDatabase);
app.get('/books/nuke', emptyDatabase);

// Handle all unknown routes
app.get('*', (request, response) => {
  response.status(404).json({ message: 'Not Found' });
});

// Handle all errors
app.use((error, request, response) => {
  console.error(error);
  response.status(500).json({ message: 'Internal Server Error' });
});

// Round Handlers ...
async function handleGetBooks(request, response) {
  // Get all the books from the database
  try {
    const books = await Book.find();
    response.json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handleCreateBook(request, response) {
  try {
    const newBook = await Book.create(request.body);
    response.json(newBook);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handleUpdateBook(request, response) {
  const id = request.params.id;
  const updatedBookData = request.body;

  const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true });

  response.json(updatedBook);
}

async function handleDeleteBook(request, response) {
  console.log('request params:', request.params);
  const id = request.params.id;
  console.log('book id:', id);
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    response.json(deletedBook);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function seedDatabase(request, response) {
  let results = await Book.seed();
  response.send({ message: results });
}

async function emptyDatabase(request, response) {
  let results = await Book.clear();
  response.json({ message: results });
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

