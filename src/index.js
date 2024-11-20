const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

const connection = require('./db/connection')

// const Funcionario = require('./models/Funcionario')
// const Finance = require('./models/Finance')
// const Feedback = require('./models/Feedback')

const financeRoutes = require('./routes/financeRoutes')
const funcionarioRoutes = require('./routes/funcionarioRoutes')
const authRoutes = require('./routes/authRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const TasksRoutes = require('./routes/TasksRoutes')


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('src/public'))

app.use('/finance', financeRoutes)
app.use('/funcionario', funcionarioRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/', authRoutes)
app.use('/tasks', TasksRoutes)


connection
  //.sync({ alter: true })
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
