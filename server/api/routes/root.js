const express = require('express');
const router = express.Router();

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

module.exports = router;
