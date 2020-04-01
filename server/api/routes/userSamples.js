const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
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
