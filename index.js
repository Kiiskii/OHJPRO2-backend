const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const favoritesRoutes = require('./routes/favorites')

const errorController = require('./controllers/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const pool = require('./util/database');

pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('Connected to database');
})

app.use('/auth', authRoutes);

app.use('/favorites', favoritesRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));