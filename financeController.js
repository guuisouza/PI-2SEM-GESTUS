const Finance = require('../models/Finance')

// Renderiza a página de criação de registro de finanças
const renderCreateFinancePage = (req, res) => {
  res.render('finance/Finance')
}

// Cria um novo registro de finanças
const createFinanceRecord = async (req, res) => {
  const { name, cargo, description, amount, date } = req.body

  // Verificando todos os campos necessários
  if (!name || !cargo || !description || !amount || !date) {
    return res.status(400).json({
      message: 'Name, cargo, description, amount, and date are required.'
    })
  }

  try {
    await Finance.create({ name, cargo, description, amount, date })
    res.redirect('/finance/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao criar registro: ' + error.message)
  }
}

// Deleta um registro de finanças
const deleteFinanceRecord = async (req, res) => {
  const { id } = req.params

  try {
    await Finance.destroy({ where: { id } })
    res.redirect('/finance/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao deletar registro: ' + error.message)
  }
}

// Renderiza a página de edição de registro de finanças
const renderUpdateFinancePage = async (req, res) => {
  const { id } = req.params

  try {
    const record = await Finance.findByPk(id)
    if (record) {
      res.render('finance/updateFinance', {
        finance: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registro para edição.')
  }
}

// Atualiza um registro de finanças
const updateFinanceRecord = async (req, res) => {
  const { id, name, cargo, description, amount, date } = req.body

  // Verificando todos os campos necessários
  if (!id || !name || !cargo || !description || !amount || !date) {
    return res.status(400).json({
      message: 'ID, name, cargo, description, amount, and date are required.'
    })
  }

  try {
    const [updated] = await Finance.update(
      { name, cargo, description, amount, date },
      { where: { id } }
    )

    if (updated) {
      return res.redirect('/finance/all')
    } else {
      return res.status(404).send('Registro não encontrado.')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Erro ao atualizar registro: ' + error.message)
  }
}

// Visualiza todos os registros de finanças
const viewAllFinanceRecords = async (req, res) => {
  try {
    const records = await Finance.findAll()
    const plainRecords = records.map((record) => record.get({ plain: true }))
    res.render('finance/allFinances', { records: plainRecords })
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registros.')
  }
}

// Exporta as funções do controlador
module.exports = {
  renderCreateFinancePage,
  createFinanceRecord,
  deleteFinanceRecord,
  renderUpdateFinancePage,
  updateFinanceRecord,
  viewAllFinanceRecords
}
