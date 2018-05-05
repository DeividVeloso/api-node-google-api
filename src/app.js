'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();

//Carrega as rotas
const indexRoutes = require('./routes/index-route');
const analyticsRoutes = require('./routes/analytics-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/analytics', analyticsRoutes);

module.exports = app;