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
  let time = moment().isoWeek()

  try {
    samples = await db.Sample.findAll({
      where: {
        user_id: user.id,
        date: {
          [Op.gte]: moment().isoWeek(time).startOf('week').isoWeekday(1),
          [Op.lt]: moment().isoWeek(time).endOf('week').isoWeekday(1)
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
