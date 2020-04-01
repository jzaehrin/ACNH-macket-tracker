const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  let user

  try {
    user = await db.User.findOne({
      where: {
        uuid: req.body.uuid
      }
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user === null) {
    res.status(403).send({message: "You do not have rights to create a sample"});
    return;
  }

  let sample

  let date = new Date(req.body.date);
  if(req.body.moment === '1')
    date.setUTCHours(12, 0, 0, 0);
  else
    date.setUTCHours(0, 0, 0, 0);

  try {
    sample = await db.Sample.create({
      userId: user.id,
      date: date,
      amount: req.body.amount
    })
  } catch(error) {
    if(error.name === 'SequelizeUniqueConstraintError')
      res.status(403).send({message: "You cannot modify your previous sample"});
    else
      res.status(500).send({message: "Unexpected error"});
    return
  }

  if (sample !== null)
    res.status(200).send();
  else
    res.status(500).send({message: "Unexpected error"});
});

router.post('/getFromUser', async (req, res) => {
  let user

  try {
    user = await db.User.findOne({
      where: {
        uuid: req.body.uuid
      },
      include: ['samples']
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  return res.status(200).send({user: user, sample: user.samples});
});

module.exports = router;
