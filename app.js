const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Initialize Sequelize with in-memory SQLite
const sequelize = new Sequelize('sqlite::memory:');

// Define the Book model
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Sync the model with the database
sequelize.sync();

// Define routes
app.get('/books', async (req, res) => {
  const books = await Book.findAll();
  res.render('books/index', { books });
});

app.get('/books/new', (req, res) => {
  res.render('books/new');
});

app.post('/books', async (req, res) => {
  await Book.create(req.body);
  res.redirect('/books');
});

app.post('/books/:id/delete', async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.redirect('/books');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
