const Sequelize = require('sequelize')

let db = {}

const sequelize = new Sequelize('acnh_market_tracker', 'dbacnh_market_tracker', 'dbacnh_market_trackerpw', {
  host: 'localhost',
  dialect: 'mariadb',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db.User = sequelize.define('user', {
  uuid: {
    type: Sequelize.STRING,
    field: 'uuid',
    allowNull: false
  },
  fakeUuid: {
    type: Sequelize.STRING,
    field: 'fake_uuid',
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
        fields: ['date', 'userId']
      }
    ]
  });

db.User.hasMany(db.Sample)

sequelize.sync()

module.exports = db
