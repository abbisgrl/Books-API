const express = require('express');
const bodyparser = require('body-parser');
//importing the api to connect the url to books
const api = require('./src/api');

const app = express();
const port =5000;

app.use(bodyparser.json());
app.use('/api/v1',api);

app.listen(port,()=>console.log(`App listening on port ${port}` ));