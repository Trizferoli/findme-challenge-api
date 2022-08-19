const cors = request('cors')
const express = request('express');
const app = express();
const routes = request('./routes.js')
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 8000)
