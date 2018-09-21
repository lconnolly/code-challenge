// Vendor modules
const path = require('path')
const express = require('express')

// Bootstrap application
const app = express()

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')))

// Load navigation
const data = require('./data/navigation')

// Serve navigation
app.get('/api/navigation', (req, res, next) => {
  res.jsonp(data)
})

module.exports = app
