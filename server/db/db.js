const Sequelize = require('sequelize')

let db = {}

require('dotenv').config();

const sequelize = new Sequelize('acnh_market_tracker', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: process.env.DB_TYPE,
  logging: (process.env.DB_LOG) ? console.log : false,

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
  suuid: {
    type: Sequelize.STRING,
    field: 'suuid',
    allowNull: false
  }
});

db.FriendList = sequelize.define('friendlist', {
  user_id1: {
    type: Sequelize.INTEGER,
    field: 'user_id_1',
    allowNull: false,
  },
  user_id2: {
    type: Sequelize.INTEGER,
    field: 'user_id_2',
    allowNull: false,
  },
  relation: {
    type: Sequelize.ENUM,
    field: 'relation',
    allowNull: true,
    values: ['active', 'pending', 'deleted']
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
});
db.User.hasMany(db.FriendList, {
  foreignKey: 'user_id_1'
});
db.FriendList.hasOne(db.User, {
  primaryKey: 'user_id_2',
  foreignKey: 'id',
  constraints: false
});

sequelize.sync({force: true});

module.exports = db
