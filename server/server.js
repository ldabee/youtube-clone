// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path');

// Import routes
const appRouter = require('./routes/app-route')

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('build'))

// Implement users route
app.use('/users', appRouter)


app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`)
})