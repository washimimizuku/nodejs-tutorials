var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const db = req.db;
  const collection = db.get('user');

  try {

    const users = await collection.find({})
    res.status(200).json(users);

  } catch (err) {

    next(err);

  }

});

/* GET user. */
router.get('/:id', async function(req, res, next) {

  const userID = req.params.id;
  const db = req.db;
  const collection = db.get('user');

  try {

    const user = await collection.findOne({ 'id': userID });
    res.status(200).json(user);

  } catch (err) {

    next(err);

  }

});

/* POST user. */
router.post('/', async function(req, res, next) {

  const db = req.db;
  const collection = db.get('user');

  try {

    const user = await collection.insert({
      'id': req.body.id,
      'name': req.body.name,
      'email': req.body.email,
    });

    res.status(200).json(user);

  } catch (err) {

    next(err);

  }

});

/* PUT user. */
router.put('/:id', async function(req, res, next) {

  const userID = req.params.id;
  const db = req.db;
  const collection = db.get('user');

  try {

    const user = await collection.update({ 'id': userID }, {
      'id': req.body.id,
      'name': req.body.name,
      'email': req.body.email,
    });

    res.status(200).json(user);

  } catch (err) {

    next(err);

  }

});

/* DELETE user. */
router.put('/:id', async function(req, res, next) {

  const userID = req.params.id;
  const db = req.db;
  const collection = db.get('user');

  try {

    const user = await collection.remove({ 'id': userID })
    res.status(200).json(user);

  } catch (err) {

    next(err);

  }

});

module.exports = router;
