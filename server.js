const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('heya whirl'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now listening on port ${port}`));