const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route to get items for logged in user from db
router.get('/', (req, res) => {
  const sqlText = `
    SELECT * FROM "home_item" WHERE "user_id" = $1;
    `;
    pool.query(sqlText, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error with GET all items:', err);
      res.sendStatus(500);
    })
});

// GET details of only selected home item
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log('req.params.id selected item:', id);
  const sqlText = `
      SELECT home_item.name, home_item.re_date, home_item.location, home_item.priority_level, home_item.id, home_item.is_complete FROM "home_item"
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
  const sqlText = `INSERT INTO "home_item" ("name", "re_date", "location", "priority_level", "user_id")
                  VALUES ($1, $2, $3, $4, $5);`;
  const itemData = [req.body.name, req.body.re_date, req.body.location, req.body.priority_level, req.user.id];
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
  if(req.body.user_id===req.user.id) {
  const sqlText = `DELETE FROM "home_item" WHERE id=$1;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Deleting item from db failed:', err);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

// PUT item; allow user to update item details
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('reqbody', req.body);
  console.log('req.params', req.params);
  const sqlText= `
    UPDATE "home_item" SET "name"=$2, "priority_level"=$3, "location"=$4, "re_date"=$5
    WHERE id=$1;`;
  
  const putValues = [req.params.id, req.body.name, req.body.priority_level, req.body.location, req.body.re_date]
  pool.query(sqlText, putValues)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error with UPDATE item details:', err);
      res.sendStatus(500);
    })
});

// PUT item; allow user to mark as completed
router.put('/complete/:id', rejectUnauthenticated, (req, res) => {
  console.log(`UPDATE item ${req.params.id}. req.body:`, req.body);
    const sqlText = `
      UPDATE "home_item" SET "is_complete" = TRUE 
      WHERE id = $1;`; 
    pool.query(sqlText, [req.params.id, req.body.is_complete])
    .then(result => {
      console.log('UPDATE item to complete was successful:', sqlText);
      res.sendStatus(201)
    })
    .catch(err => {
      console.log('Error with UPDATE item:', err)
      res.sendStatus(500);
    })
});

module.exports = router;
