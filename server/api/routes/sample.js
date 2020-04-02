const express = require('express')
const moment = require('moment')
const router = express.Router()

router.post('/', async (req, res) => {
  let user

  try {
    user = await db.User.findOne({
      where: {
        suuid: req.body.suuid
      }
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user === null) {
    res.status(403).send({message: "You do not have rights to create a sample"})
    return;
  }

  let sample

  let date = moment(req.body.date).startOf('day').utc()
  if(req.body.moment === 1)
    date.add(12, 'hours')

  try {
    sample = await db.Sample.create({
      userId: user.id,
      date: date,
      amount: req.body.amount
    })
  } catch(error) {
    if(error.name === 'SequelizeUniqueConstraintError')
      res.status(403).send({message: "You cannot modify your previous sample"})
    else
      res.status(500).send({message: "Unexpected error"})
    return
  }

  if (sample !== null)
    res.status(200).send({message: "Sample correctly added"});
  else
    res.status(500).send({message: "Unexpected error"})
});

module.exports = router;
