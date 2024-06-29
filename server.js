// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// import Controllers
const indexRoute = require('./src/Routes/index')

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json()); 
app.use(cors());

app.use('/api',indexRoute)

app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
  });      

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
