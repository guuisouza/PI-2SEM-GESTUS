const { DataTypes } = require('sequelize')

const db = require('../db/connection')

const Tarefa = db.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desricao: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  data: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  prioridade: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
})

module.exports = Tarefa
