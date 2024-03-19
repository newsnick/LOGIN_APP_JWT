const data = {
  employees: require('../model/employees.json'),
  setEmployees: function (data) {
    this.employees = data
  },
}

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    Vorname: req.body.Vorname,
    Nachname: req.body.Nachname,
  }
  if (!newEmployee.Vorname || !newEmployee.Nachname) {
    return res
      .status(400)
      .json({ message: 'Vor- und Nachnamefeld müssen ausgefüllt sein. ' })
  }
  data.setEmployees([...data.employees, newEmployee])
  res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  )
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Mitarbeiter ID ${req.body.id} nicht vorhanden` })
  }
  if (req.body.Vorname) employee.Vorname = req.body.Vorname
  if (req.body.Nachname) employee.Nachname = req.body.Nachname
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  )
  const unsortedArray = [...filteredArray, employee]
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  )
  res.json(data.employees)
}

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  )
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Mitarbeiter ID ${req.body.id} nicht vorhanden` })
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  )
  data.setEmployees([...filteredArray])
  res.json(data.employees)
}

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  )
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Mitarbeiter ID ${req.params.id} nicht vorhanden` })
  }
  res.json(employee)
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}
