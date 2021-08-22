const dotenv = require('dotenv');
const express = require('express');
const carRoutes = require('./routes/carRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express();

dotenv.config();

app.use(express.json());
app.use('/cars', carRoutes);
app.use('/', authRoutes);

app.listen(3000);
