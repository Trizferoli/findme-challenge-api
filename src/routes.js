const express = require('express');
const route = express();
const { addClient, getClients, attClient, deleteClient } = require('./controllers/clients');

const { verifyToken } = require('./middlewares/verifyToken')

route.post('/client', addClient);
route.get('/clients', getClients);
route.put('/client/:id', attClient);
route.delete('/client/:id', deleteClient);


module.exports = route;