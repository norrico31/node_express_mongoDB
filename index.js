const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const cors = require('cors');
require('dotenv/config');

// MIDDLEWARES
//app.use(cors());

// BODY PARSER FOR HTML
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));


//BODY PARSER FOR POSTMAN
//app.use(bodyParser.json());


// IMPORT ROUTES 
app.use('/posts', require('./routes/posts'));


mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));

const port = process.env.port || 5000;
app.listen(port, () => console.log(`[app]: listening on port ${port}`));










// PASTE THIS ON codepen.io/pen/
// fetch('http://localhost:5000/posts')
// .then(result => {
//   return result.json()
// })
// .then(data => console.log(data))