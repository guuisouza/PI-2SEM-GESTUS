const renderLoginPage = (req, res) => {
  res.render('login/login', { isLoginPage: true })
}

const loginUser = (req, res) => {
  const { username, password } = req.body

  if (username && password) {
    // Redireciona para a página principal após o login
    return res.redirect('/funcionario')
  } else {
    // Retorna erro se as credenciais não forem válidas
    return res.status(401).send('Credenciais inválidas')
  }
}

module.exports = {
  renderLoginPage,
  loginUser
}
