const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route to get all set reminders for logged in user from db
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT reminders.id, reminders.frequency, reminders.next_date, reminders.description_notes, reminders.home_item_id, home_item.name,
    home_item.re_date, home_item.location, home_item.priority_level, home_item.is_complete, home_item.user_id FROM "reminders"
    JOIN "home_item" ON 
    reminders.home_item_id = home_item.id
    JOIN "user" ON 
    home_item.user_id = "user".id
    WHERE home_item.user_id = $1;
    `;
    pool.query(sqlText, [req.user.id])
    .then(result => {
        console.log('get reminders successful. result rows:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error with GET reminders:', err);
      res.sendStatus(500);
    })
});

// GET details of only selected reminder
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log('req.params.id of selected reminder:', id);
  const sqlText = `
    SELECT reminders.id, reminders.frequency, reminders.next_date, reminders.description_notes, reminders.home_item_id, home_item.id, home_item.name,
    home_item.re_date, home_item.location, home_item.priority_level, home_item.is_complete, home_item.user_id FROM "reminders"
    JOIN "home_item" ON 
    reminders.home_item_id = home_item.id
    JOIN "user" ON 
    home_item.user_id = "user".id
    WHERE home_item.user_id = $1;
    `;
    pool.query(sqlText, [id])
    .then(result => {
        console.log('get details of reminder. result rows:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error with GET reminder/:id', err);
      res.sendStatus(500);
    })
});

// POST new reminder for specified home item to db
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('POST reminder req.body:', req.body)
  const sqlText = `INSERT INTO "reminders" ("frequency", "next_date", "description_notes", "home_item_id")
                  VALUES ($1, $2, $3, $4);`;
  const reminderData = [req.body.frequency, req.body.next_date, req.body.description_notes, req.body.home_item_id];
    pool.query(sqlText, reminderData)
    .then(result => {
      console.log('POST reminder was successful')
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error with POST reminder:', err)
      res.sendStatus(500);
    })
});


module.exports = router;