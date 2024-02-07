const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
const databaseUrl = process.env.DATABASE_URL;


mongoose.connect(databaseUrl)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', ACCESS_CONTROL_ALLOW_HEADERS);
    res.setHeader('Access-Control-Allow-Methods', ACCESS_CONTROL_ALLOW_METHODS);
    next();
});

app.use(express.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;