const express = require('express')
const cors = require('cors')
const app = express()

// Cross origin Resource Sharing
const whitelist = [
  'https://www.google.de',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
]

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

module.exports = corsOptions
