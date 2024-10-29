const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const connection = require('./db/connection')

// Models

// import routes

// controllers

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// use routes

connection
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
