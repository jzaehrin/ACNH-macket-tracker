const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/valid', function (req, res) {
  db.User.findOne({
    where: {
      uuid: req.body.uuid
    }
  }).then((user) => {
    console.log(req);
    if(user !== null) {
      res.status(200).send();
    } else {
      res.status(403).send({message: "User not found"});
    }
  }).catch(() => {
    res.status(500).send({message: "Unexpected error"});
  })
});

router.get('/identity', function (req, res) {
  uuid = uuidv4()
  db.User.create({
    uuid: uuid,
    fakeUuid: uuidv4()
  }).then((user) => {
    if(user !== null) {
      res.status(200).send({uuid: user.uuid, fake_uuid: user.fake_uuid});
    } else {
      res.status(500).send({message: "Unexpected error"});
    }
  }).catch(() => {
    res.status(500).send({message: "Unexpected error"});
  })
});

module.exports = router;
