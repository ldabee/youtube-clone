// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Import routes
const appRouter = require('./routes/app-route')

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

// const fs = require('fs');
// const { exec } = require('child_process')
// // require('child_process').exec('start "" "C:\\Users\\dabee\\Desktop\\Jeux\\SNESSEmu"');
// fs.readdirSync('C:\\Users\\dabee\\Desktop\\Jeux').forEach(file => {
//   // if (file.split('.')[1] === "exe") {
//   console.log(file);
//   // exec(`C:\\Users\\dabee\\Desktop\\Jeux\\SNESSEmu\\${file}`);
//   // }
// })


// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Implement users route
app.use('/users', appRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`)
})