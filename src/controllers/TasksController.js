const Tarefas = require('../models/Tarefas')

const renderCreateTasksPage = (req, res) => {
  res.render('Tarefas/registrarTarefas')
}

const createTasksRecord = async (req, res) => {
  const { titulo, descricao, data, prioridade } = req.body

  if (!titulo || !descricao || !data || !prioridade) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  const tarefa = {
      titulo,
      descricao,
      data,
      prioridade
  }

  try {
    await Tarefas.create(tarefa)
    res.redirect('/tarefa/all')
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao criar registro: ' + err.message)
  }
}

const viewAllTasksRecords = async (req, res) => {
  try {
    const records = await Tarefas.findAll()
    const plainRecords = records.map((record) => record.get({ plain: true }))
    res.render('Tarefas/registrarTarefas', { records: plainRecords })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar registros.')
  }
}

const deleteTasksRecord = async (req, res) => {
  const { id } = req.params

  try {
    await Tarefas.destroy({ where: { id } })
    res.redirect('/tarefa/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao deletar registro: ' + error.message)
  }
}

const renderUpdateTasksPage = async (req, res) => {
  const { id } = req.params

  try {
    const record = await Tarefas.findByPk(id)
    if (record) {
      res.render('tarefa/editarTarefa', {
        tarefa: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registro para edição.')
  }
}

const updateTasksRecord = async (req, res) => {
  const { titulo, descricao, data, prioridade } = req.body

  if (!titulo || !descricao || !data || !prioridade) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  try {
    const [updated] = await Tarefas.update(
      { titulo, descricao, data, prioridade },
      { where: { id } }
    )

    if (updated) {
      return res.redirect('/tarefa/all')
    } else {
      return res.status(404).send('Registro não encontrado.')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Erro ao atualizar registro: ' + error.message)
  }
}

module.exports = {
  renderCreateTasksPage,
  createTasksRecord,
  viewAllTasksRecords,
  deleteTasksRecord,
  renderUpdateTasksPage,
  updateTasksRecord
}
