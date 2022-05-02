const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port =5000;

app.use(bodyparser.json());

app.listen(port,()=>console.log(`App listening on port ${port}` ));