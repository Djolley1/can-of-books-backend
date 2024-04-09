const mongoose = require('mongoose');
const bookSchema = require('./schema');

// Helper function to add some dogs to the database
// Use "statics" which lets us do things like Dog.seed();
// "Seeding" the database
bookSchema.statics.seed = async function() {

  await Book.create({
    title: 'Art of War',
    description: 'in the midst of chaos',
    status: 'available'
  });

  await Book.create({
    title: 'The Sour Grape',
    description: 'Childrens Book',
    status: 'available'
  });

  await Book.create({
    title: 'Cross Stitch',
    description: 'Trip of a lifetime',
    status: 'available'

  });

  return 'Books seeded successfully';

};

bookSchema.statics.clear = async function() {
  try {
    // Delete "many" dogs that match the {} filter query
    await Book.deleteMany({});
    return 'Cleared the database';
  } catch(e) {
    return e.message;
  }
};


const Book = mongoose.model('Book:', bookSchema);

module.exports = Book;
