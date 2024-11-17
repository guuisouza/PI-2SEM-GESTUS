const express = require('express')
const router = express.Router()
const {
  renderCreateFinancePage,
  createFinanceRecord,
  deleteFinanceRecord,
  renderUpdateFinancePage,
  updateFinanceRecord,
  viewAllFinanceRecords
} = require('../controllers/TasksController')

router.get('/', renderCreateTasksPage)
router.post('/create', createTasksRecord)
router.get('/delete/:id', deleteTasksRecord)
router.get('/update/:id', renderUpdateTasksPage)
router.post('/update', updateTasksRecord)
router.get('/all', viewAllTasksRecords)

module.exports = router
