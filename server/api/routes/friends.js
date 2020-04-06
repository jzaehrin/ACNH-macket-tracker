const express = require('express')
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

  let friends

  try {
    friends = await db.FriendList.findAll({
      where: {
        [Op.or]: [
          {
            user_id_1: user.id,
            relation: 'active'
          },
          {
            user_id_1: user.id,
            relation: 'pending'
          },
          {
            user_id_2: user.id,
            relation: 'pending'
          }
        ]
      },

      //include: ['users']
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({message: "Unexpected error"});
    return
  }

  let users

  try {
    users = await db.User.findAll({
      where: {
        id: {
          [Op.not]: user.id
        }
      },
      attributes: {exclude: ['suuid', 'friendlists']},
      include: [{
        model: db.FriendList,
        as: 'friendlists',
        required: false,
        attributes: [],
        where: {
          [Op.or]: [
            {
              user_id_1: user.id,
              relation: 'active'
            },
            {
              user_id_1: user.id,
              relation: 'pending'
            },
            {
              user_id_2: user.id,
              relation: 'pending'
            }
          ]
        },
      }]
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({message: "Unexpected error"});
    return
  }


  return res.status(200).send({friends: friends, users: users});
});

module.exports = router;
