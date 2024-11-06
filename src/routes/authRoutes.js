const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Rota para renderizar a página de login
router.get('/login', authController.renderLoginPage)

// Rota para processar o login
router.post('/login', authController.loginUser)

module.exports = router
