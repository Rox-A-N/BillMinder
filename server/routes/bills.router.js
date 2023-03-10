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



router.post('/', (req, res) => {
  // POST route code here
  console.log('inside POST route', req.body);
  let queryText = `
  INSERT INTO "bill_data" ("user_id", "name", "amount", "due_date", "category", "payment_method", "payment_status", "cleared_bank", "notes")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING "id";
  `;
  pool.query(queryText, [req.user.id, req.body.newBill.name, req.body.newBill.amount, 
    req.body.newBill.due_date, req.body.newBill.category, req.body.newBill.payment_method, 
    req.body.newBill.payment_status, req.body.newBill.cleared_bank, req.body.newBill.notes] )
    .then((result) => {
    console.log('Response in POST:', req.body);
    res.send(result.rows);
  }).catch(error => {
    console.log(error);
    res.sendStatus(503);
  })
});

// /** 
// PUT route template- NEED TO CHANGE THE DEETS TO USE BELOW CODE
//  */

// router.put('/:id', (req, res) => {
//   // Update this single bill
//   const billToUpdate = req.params.id;
//   const sqlText = `UPDATE bill_data SET github_name = $1 WHERE id = $2`;
//   pool.query(sqlText, [req.body.github_name, billToUpdate])
//       .then((result) => {
//           res.sendStatus(200);
//       })
//       .catch((error) => {
//           console.log(`Error making database query ${sqlText}`, error);
//           res.sendStatus(500);
//       });
// });

module.exports = router;
