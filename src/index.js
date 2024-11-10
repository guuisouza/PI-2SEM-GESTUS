const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

const connection = require('./db/connection')

// Models - Importe aqui os models das tabelas criadas e descomente ao rodar a primeira vez
// const Funcionario = require('./models/Funcionario')
// const Finance = require('./models/Finance')

// import routes
const financeRoutes = require('./routes/financeRoutes')
const funcionarioRoutes = require('./routes/funcionarioRoutes')
const authRoutes = require('./routes/authRoutes')

// controllers

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// receber resposta do body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('src/public'))

//Rota
app.use('/finance', financeRoutes)
app.use('/funcionario', funcionarioRoutes)
app.use('/', authRoutes)

// use routes

connection
  // .sync({ alter: true }) // quando for rodar a primeira vez a sua tabela descomente essa e comente a de baixo
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
