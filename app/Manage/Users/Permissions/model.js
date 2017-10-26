const Sequelize = require('sequelize')
const db = require('../../../../config/db')

const permissions = db.define('permissions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  actionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'actions',
      key: 'id'
    }
  },
  roleId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'roles',
      key: 'id'
    }
  },
  permission: {
    type: Sequelize.INTEGER(1)
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  addedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = permissions
