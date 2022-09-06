

const express = require('express')
const bodyParser = require('body-parser')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config()

const connectDB = require('./config/db');
const app = express()

connectDB();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Define routes for
app.use('/', require('./routes/getUrl'));
app.use('/', require('./routes/postUrl'));

app.set('view engine', 'ejs')


// midellwares for intercepting errors
app.use((req, res, next) => {
  next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('index', { error: err.message })
})

const PORT= process.env.PORT || 3000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
