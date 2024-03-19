const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

// Benutzerdefinierte Middleware für das Protokollieren
// von Ereignissen
app.use(logger)

// Cross-Origin-Ressourcenfreigabe
const whitelist = [
  'https://www.google.de',
  'http://127.0.0.1:5500',
  ' http://localhost:3500',
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

// Eingebaute Middleware zum Handhaben von URL-kodierten Daten
// Formulardaten:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// Eingebaute Middleware für JSON
app.use(express.json())

// Statische Dateien bereitstellen
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))

// Routen
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('html')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not FOund')
  }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
