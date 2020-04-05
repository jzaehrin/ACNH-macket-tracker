const express = require('express')
const moment = require('moment')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

router.get('/:uuid', async (req, res) => {
  let user
  let uuid = req.params.uuid

  try {
    user = await db.User.findOne({
      where: {
        uuid: uuid
      },
      attributes: {exclude: ['suuid']}
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  return res.status(200).send({user: user, sample: user.samples});
});

router.get('/:uuid/samples', async (req, res) => {
  let user
  let uuid = req.params.uuid

  try {
    user = await db.User.findOne({
      where: {
        uuid: uuid
      },
      attributes: {exclude: ['suuid']}
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  let samples
  let weekNumber
  let year = moment()
  if (req.query.week !== undefined && req.query.week !== null) {
    if (req.query.year !== undefined && req.query.year !== null){
      if (isNaN(parseInt(req.query.year, 10)))
        return res.status(404).send({message: "Year is not a number"})

      year = moment().year(parseInt(req.query.year, 10))
    }

    weekNumber = parseInt(req.query.week, 10);

    if (isNaN(weekNumber))
      return res.status(404).send({message: "Week number is not a number"})

    if (weekNumber < year.startOf('year').isoWeek() && weekNumber > year.endOf('year').isoWeek())
      return res.status(404).send({message: "Week number is out of range"})
  } else {
    weekNumber = moment().isoWeek()
  }

  try {
    samples = await db.Sample.findAll({
      where: {
        user_id: user.id,
        date: {
          [Op.gte]: moment(year).isoWeek(weekNumber).startOf('week').isoWeekday(1),
          [Op.lt]: moment(year).isoWeek(weekNumber).endOf('week').isoWeekday(1)
        },
      }
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({message: "Unexpected error"});
    return
  }

  return res.status(200).send({user: user, samples: samples});
});

module.exports = router;
