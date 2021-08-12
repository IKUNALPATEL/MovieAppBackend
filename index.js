const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const genres = require('./routes/genres')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const customers = require('./routes/customers')
const users = require('./routes/users')
const auth = require('./routes/auth')

if(! config.get('jwtPrivateKey')){
    console.error('Fatal Error : jwtPrivate Key is not defind.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vital')
 .then(()=>console.log(`Connected to the MongoDB...`))
 .catch(()=>console.error(`Could not connect to MongoDB...`));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);


app.get("/", (req, res) => {
    res.send("Hello world")
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`running on the port ${port}`) });