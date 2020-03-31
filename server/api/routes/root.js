const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

router.post('/valid', async (req, res) => {
  let user

  try {
    user = await db.User.findOne({
      where: {
        uuid: req.body.uuid
      }
    })
  } catch(err) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user !== null) {
    res.status(200).send();
  } else {
    res.status(403).send({message: "User not found"})
  }
});

router.get('/identity', async (req, res) => {
  let user

  try {
    user = await db.User.create({
      uuid: uuidv4(),
      fakeUuid: uuidv4()
    })
  } catch(err) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user !== null) {
    res.status(200).send({uuid: user.uuid, fake_uuid: user.fakeUuid})
  } else {
    res.status(500).send({message: "Unexpected error"})
  }
})

module.exports = router;
