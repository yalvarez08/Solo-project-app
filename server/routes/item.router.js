const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route to get items from db
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "home_item"`;
    pool.query(sqlText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
});


// POST new item to db
router.post('/', (req, res) => {
  console.log('POST item req.body:', req.body)
  const sqlText = `INSERT INTO "home_item" ("name", "re_date", "location", "priority_level")
                  VALUES ($1, $2, $3, $4);`;
  const itemData = [req.body.name, req.body.re_date, req.body.location, req.body.priority_level];
    pool.query(sqlText, itemData)
    .then(result => {
    console.log('POST item was successful')
    res.sendStatus(201);
    })
    .catch(err => {
    console.log('Error with POST item:', err)
    res.sendStatus(500);
    })
});

module.exports = router;
