const express = require('express')
const router = express.Router()

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
  try {
    samples = await db.Sample.findAll({
      where: {
        user_id: user.id
      }
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  return res.status(200).send({user: user, samples: samples});
});

module.exports = router;
