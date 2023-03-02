const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('in the server GET bills!');
//   res.send('HEEEEEYYY!!!!');
  let queryText = `SELECT * FROM "bill_data" WHERE "user_id" =$1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    console.log('RESPONSE from db is: ', result.rows);
    res.send(result.rows);
  }).catch((error) => {
    console.log('error with GET request', error);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
