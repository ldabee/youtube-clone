// Import express
const express = require('express')

// Import books-controller
const appRoutes = require('../controllers/app-controller.js')

// Create router
const router = express.Router()

router.get('/allUsers', appRoutes.users)

router.post('/create', appRoutes.userCreate)

router.put('/delete', appRoutes.userDelete)

router.put('/reset', appRoutes.usersReset)

// Export router
module.exports = router