const Sequelize = require('sequelize')
const db = require('../../../../config/db')

const userRoles = db.define('userRoles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'roles',
      key: 'id'
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = userRoles
