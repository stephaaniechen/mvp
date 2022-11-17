require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port: ${process.env.SERVER_PORT}`);
});
