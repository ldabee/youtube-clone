// Import database
const knex = require('../db')

exports.users = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

exports.userCreate = async (req, res) => {
  knex('users')
    .insert({
      'firstname': req.body.firstname,
      'lastname': req.body.lastname,
      'email': req.body.email,
      'password': req.body.password
    })
    .then(() => {
      res.json({ message: `user ${req.body.email} created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.email} user: ${err}` })
    })
}

exports.userDelete = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `user ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
    })
}

exports.usersReset = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .truncate()
    .then(() => {
      res.json({ message: 'users list cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error resetting users list: ${err}.` })
    })
}