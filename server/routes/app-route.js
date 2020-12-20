// Import express
const express = require('express')

// Import books-controller
const appRoutes = require('../controllers/app-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all users
// In server.js, users route is specified as '/users'
// this means that '/all' translates to '/users/all'
router.get('/allUsers', appRoutes.users)

// Add route for POST request to create new user
// In server.js, users route is specified as '/users'
// this means that '/create' translates to '/users/create'
router.post('/create', appRoutes.userCreate)

// Add route for PUT request to delete specific user
// In server.js, users route is specified as '/users'
// this means that '/delete' translates to '/users/delete'
router.put('/delete', appRoutes.userDelete)

// Add route for PUT request to reset users list
// In server.js, users route is specified as '/users'
// this means that '/reset' translates to '/users/reset'
router.put('/reset', appRoutes.usersReset)

// Export router
module.exports = router