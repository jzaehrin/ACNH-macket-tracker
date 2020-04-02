
const Sequelize = require('sequelize')

let db = {}

require('dotenv').config();

const sequelize = new Sequelize('acnh_market_tracker', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: process.env.DB_TYPE,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db.User = sequelize.define('user', {
  uuid: {
    type: Sequelize.STRING,
    field: 'suuid',
    allowNull: false
  },
  fakeUuid: {
    type: Sequelize.STRING,
    field: 'uuid',
    allowNull: false
  }
});

db.Sample = sequelize.define('sample', {
    date: {
      type: Sequelize.DATE,
      field: 'date',
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      field: 'amount',
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['date', 'user_id']
      }
    ]
  });

db.User.hasMany(db.Sample, {
  foreignKey: 'user_id'
})

sequelize.sync()

module.exports = db
