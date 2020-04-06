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

db.Friend = sequelize.define('friend', {
  relation: {
    type: Sequelize.ENUM,
    field: 'relation',
    values: ['active', 'pending', 'deleted']
  },
  user1_username: {
    type: Sequelize.STRING,
    field: 'applicant_username',
    allowNull: true
  },
  user2_username: {
    type: Sequelize.STRING,
    field: 'asked_username',
    allowNull: true
  }
},
  {
  indexes: [
    {
      unique: true,
      fields: ['applicant_id', 'asked_id']
    }
  ]
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

db.Friend.belongsTo(db.User, {
  as: 'applicant',
  foreignKey: 'applicant_id'
});

db.Friend.belongsTo(db.User, {
  as: 'asked',
  foreignKey: 'asked_id'
});


db.User.hasMany(db.Sample, {
  foreignKey: 'user_id'
});

db.User.hasMany(db.Friend, {
  foreignKey: 'applicant_id',
  as: 'applicant',
});

db.User.hasMany(db.Friend, {
  foreignKey: 'asked_id',
  as: 'asked',
});



sequelize.sync({force: true});

module.exports = db
