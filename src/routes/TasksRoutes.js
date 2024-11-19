const express = require('express')
const router = express.Router()
const {
  renderCreateTasksPage,
  createTasksRecord,
  deleteTasksRecord,
  renderUpdateTasksPage,
  updateTasksRecord,
  viewPendingTasks,
  viewCompletedTasks,
  markTaskAsCompleted
} = require('../controllers/TasksController')

// Rotas para criação, edição e exclusão
router.get('/', renderCreateTasksPage)
router.post('/create', createTasksRecord)
router.get('/delete/:id', deleteTasksRecord)
router.get('/update/:id', renderUpdateTasksPage)
router.post('/update/:id', updateTasksRecord)

// Rotas para visualizar tarefas
router.get('/pendentes', viewPendingTasks)
router.get('/concluidas', viewCompletedTasks)

// Rota para marcar uma tarefa como concluída
router.post('/concluir/:id', markTaskAsCompleted)

module.exports = router
