const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

// Benutzerdefinierte Middleware für das Protokollieren
// von Ereignissen
app.use(logger)

// Eingebaute Middleware zum Handhaben von URL-kodierten Daten
// Formulardaten:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// Eingebaute Middleware for json
app.use(express.json())

// Statische Dateien bereitstellen
app.use('/', express.static(path.join(__dirname, '/public')))

// Routen
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
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
