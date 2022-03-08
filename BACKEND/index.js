const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


app.use(cors());
//middleware to use json in server
app.use(express.json());
// config envoirnment variable path
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

// Database connection
try {
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err && console.log(err);
    !err && console.log(`Connected To Database on ${DB_URL}`);
  });
} catch (err) {
  console.log(err);
}

// Routes
app.use('/', require('./routes/authRoutes'));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

