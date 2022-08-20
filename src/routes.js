const express = require('express');
const route = express();
const { addClient, getClients, attClient, deleteClient } = require('./controllers/clients');
const { addEmployee, loginEmployee, getEmployees, attEmployee, deleteEmployee } = require('./controllers/employees');

const { verifyToken } = require('./middlewares/verifyToken')


route.post('/employee', addEmployee);
route.post('/login', loginEmployee);

route.use(verifyToken);
route.get('/employees', getEmployees);
route.put('/employee', attEmployee);
route.delete('/employee', deleteEmployee);


route.post('/client', addClient);
route.get('/clients', getClients);
route.put('/client/:id', attClient);
route.delete('/client/:id', deleteClient);


module.exports = route;