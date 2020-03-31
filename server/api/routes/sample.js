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
    res.status(403).send("You do not have rights to create a sample");
    return;
  }

  let sample

  let date = new Date(req.body.date);
  if(req.body.moment === '1')
    date.setUTCHours(12, 0, 0, 0);

  try {
    sample = await Sample.create({
      userId: user.id,
      date: date,
      amount: req.body.amount
    })

    if (sample !== null)
      res.status(200).send("Sample correctly saved");
    else
      res.status(500).send("Unexpected error");
  } catch(error) {
    if(error.name === 'SequelizeUniqueConstraintError')
      res.status(403).send("You cannot modify your previous sample");
    return
  }
});

module.exports = router;
