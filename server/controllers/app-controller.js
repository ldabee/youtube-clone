// Import database
const knex = require('../db')

// Retrieve all books
exports.users = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('users') // from 'books' table
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

// Create new book
exports.userCreate = async (req, res) => {
  // Add new book to database
  knex('users')
    .insert({ // insert new record, a book
      'firstname': req.body.firstname,
      'lastname': req.body.lastname,
      'email': req.body.email,
      'password': req.body.password
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `user ${req.body.email} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.email} user: ${err}` })
    })
}

// Remove specific book
exports.userDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('users')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `user ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
    })
}

// Remove all books on the list
exports.usersReset = async (req, res) => {
  // Remove all books from database
  knex
    .select('*') // select all records
    .from('users') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'users list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting users list: ${err}.` })
    })
}