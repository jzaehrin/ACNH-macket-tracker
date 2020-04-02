const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

router.post('/signin', async (req, res) => {
  let user

  try {
    user = await db.User.findOne({
      where: {
        suuid: req.body.suuid
      }
    })
  } catch(err) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user !== null) {
    res.status(200).send({user});
  } else {
    res.status(403).send({message: "User not found"})
  }
});

router.get('/signup', async (req, res) => {
  let user

  try {
    user = await db.User.create({
      suuid: uuidv4(),
      uuid: uuidv4()
    })
  } catch(err) {
    res.status(500).send({message: "Unexpected error"})
    return
  }

  if(user !== null) {
    res.status(200).send({user})
  } else {
    res.status(500).send({message: "Unexpected error"})
  }
})

module.exports = router;
