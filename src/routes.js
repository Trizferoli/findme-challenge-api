const express = require('express');
const route = express();
const { addClient, getClients, attClient, deleteClient } = require('./controllers/clients');
const { addEmployee, loginEmployee, getEmployees, attEmployee, deleteEmployee } = require('./controllers/employees');
const { addServiceOrder, getServiceOrders, attServiceOrder, deleteServiceOrder } = require('./controllers/serviceOrder');
const { verifyToken } = require('./middlewares/verifyToken');
const idExists = require('./middlewares/idExists');
const clientExists = require('./middlewares/clientExists');
const employeeExists = require('./middlewares/employeeExists');


route.post('/employee', addEmployee);
route.post('/login', loginEmployee);

route.use(verifyToken);
route.get('/employees', getEmployees);
route.put('/employee', attEmployee);
route.delete('/employee', deleteEmployee);

route.post('/client', addClient);
route.get('/clients', getClients);
route.put('/client/:id', idExists('clients'), attClient);
route.delete('/client/:id', idExists('clients'), deleteClient);


//SERVICE ORDER
route.post('/serviceOrder',
    clientExists,
    employeeExists,
    addServiceOrder);

route.get('/serviceOrders', getServiceOrders);

route.put('/serviceOrder/:id',
    idExists('service_order'),
    clientExists,
    employeeExists,
    attServiceOrder);

route.delete('/serviceOrder/:id',
    idExists('service_order'),
    deleteServiceOrder);


module.exports = route;