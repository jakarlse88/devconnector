const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('mongoDB connected'))
    .catch(e => console.log(e));

app.get('/', (req, res) => res.send('heya whirl'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now listening on port ${port}`));