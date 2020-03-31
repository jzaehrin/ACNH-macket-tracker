const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('acnh_market_tracker', 'dbacnh_market_tracker', 'dbacnh_market_trackerpw', {
  host: 'localhost',
  dialect: 'mariadb',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('user', {
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

var Sample = sequelize.define('sample', {
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

User.hasMany(Sample)

sequelize.sync()

app.get('/', function (req, res) {
  res.render('index', {uuid: req.query.uuid});
});

app.post('/add', function (req, res) {
  User.findOne({
    where: {
      uuid: req.body.id
    }
  }).then((user) => {
    if(user === null) {
      res.send(403, "You do not have rights to create a sample");
      return;
    }

    let date = new Date(req.body.date);

    if(req.body.moment === '1')
      date.setUTCHours(12, 0, 0, 0);

    Sample.create({
      userId: user.id,
      date: date,
      amount: req.body.amount
    }).then((sample) => {
      res.send(200, "Sample correctly saved");
    }).catch((error) => {
      if(error.name === 'SequelizeUniqueConstraintError')
        res.send(403, "You cannot modify your previous sample");
    });
  })
});

app.get('/createUser', function (req, res) {
  res.render('create-user', {uuid: req.query.uuid});
});

app.post('/createUser', function (req, res) {
  User.findOne({
    order: [['id', 'ASC']]
  }).then((user) => {
    if(user === null || user.uuid === req.body.admin) {
      let uuid = uuidv4();

      User.create({
        uuid: uuid,
        fakeUuid: uuidv4()
      }).then((user) => {
        res.send(200, user.uuid);
      });

    } else {
      res.send(403,"You do not have rights to create a user");
    }
  })
});

app.listen(3000, function () {

});
