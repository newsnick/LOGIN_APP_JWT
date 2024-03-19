// Benutzerdatenbank
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}
const bcrypt = require('bcrypt')

// Funktion zur Behandlung von Benutzeranmeldungen
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' })

  // Überprüfen, ob der Benutzer in der Datenbank vorhanden ist
  const foundUser = usersDB.users.find((person) => person.username === user)
  if (!foundUser) return res.sendStatus(401) //Unautorisiert
  // Passwort überprüfen
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    // JWTs erstellen
    res.json({ success: `User ${user} is logged in!` })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
