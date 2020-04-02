const express = require('express')
const router = express.Router()

router.get('/:uuid/samples', async (req, res) => {
  let user
  let uuid = req.params.uuid

  try {
    user = await db.User.findOne({
      where: {
        fake_uuid: uuid
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
