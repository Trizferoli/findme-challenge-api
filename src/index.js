const cors = require('cors')
const express = require('express');
const app = express();
const routes = require('./routes.js');
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 8000)
