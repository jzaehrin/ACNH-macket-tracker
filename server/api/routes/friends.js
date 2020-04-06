const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

router.get('/:suuid', async (req, res) => {
  let user
  let suuid = req.params.suuid

  try {
    user = await db.User.findOne({
      where: {
        suuid: suuid
      },
      include: [
        {
          model: db.Friend,
          as: 'applicant',
          include: [{
            model: db.User,
            as: 'asked',
            attributes: ['uuid']
          }]
        },
        {
          model: db.Friend,
          as: 'asked',
          include: [{
            model: db.User,
            as: 'applicant',
            attributes: ['uuid']
          }]
        }]
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({message: "Unexpected error"});
    return
  }

  console.log(user.applicant[0].asked)

  return res.status(200).send({applicants: user.applicant, askeds: user.asked});
});

router.post('/:suuid', async (req, res) => {
  let user
  let suuid = req.params.suuid

  try {
    user = await db.User.findOne({
      where: {
        suuid: suuid
      }
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  let asked

  try {
    asked = await db.User.findOne({
      where: {
        uuid: req.body.uuid
      }
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  let friend

  try {
    friend = await db.Friend.create({
      applicant_id: user.id,
      asked_id: asked.id,
      relation: 'pending'
    })
  } catch(error) {
    res.status(500).send({message: "Unexpected error"});
    return
  }

  return res.status(200).send();
});

module.exports = router;
