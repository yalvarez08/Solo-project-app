const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route to get items from db
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "home_item"`;
    pool.query(sqlText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error with GET all items', err);
      res.sendStatus(500);
    })
});

// GET details of only selected home item
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log('req.params.id selected item:', id);
  const sqlText = `
      SELECT home_item.name, home_item.re_date, home_item.location, home_item.priority_level FROM "home_item"
      WHERE home_item.id = $1;`;
    pool.query(sqlText, [id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error with GET /api/item/:id', err);
      res.sendStatus(500);
    })
});

// POST new item to db
router.post('/', rejectUnauthenticated, (req, res) => {
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

// DELETE item from db
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`DELETE item ${req.params.id} from home_item db table`);
  const sqlText = `DELETE FROM "home_item" WHERE id =$1;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Deleting item from db failed:', err);
      res.sendStatus(500);
    })
});

module.exports = router;
