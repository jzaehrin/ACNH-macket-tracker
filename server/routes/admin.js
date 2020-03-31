const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/createUser', function (req, res) {
  console.log("AH")
  db.User.findOne({
    order: [['id', 'ASC']]
  }).then((user) => {
    if(user === null || user.uuid === req.body.admin) {
      let uuid = uuidv4();

      db.User.create({
        uuid: uuid,
        fakeUuid: uuidv4()
      }).then((user) => {
        res.status(200).send({user: user.uuid});
      });

    } else {
      res.status(403).send({message: "You do not have rights to create a user"});
    }
  })
});

module.exports = router;
