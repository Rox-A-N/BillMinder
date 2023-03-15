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
    console.table(result.rows);
    res.send(result.rows);
  }).catch((error) => {
    console.log('error with GET request', error);
    res.sendStatus(500);
  })
});

router.get('/:id', (req, res) => {
  const idToGet = req.params.id;
  const queryText = `SELECT * FROM bill_data WHERE id=$1`;
  pool.query(queryText, [idToGet])
  .then( (result) => {
    console.table(`Bill with id ${idToGet}`, result.rows);
    res.send(result.rows);
  })
  .catch( (error) => {
    console.log(`Error making database query ${query}`, error);
    res.sendStatus(500);
  })
});



router.post('/', (req, res) => {
  // POST route code here
  console.log('inside POST route', req.body);
  let insertBillQuery = `
  INSERT INTO "bill_data" ("user_id", "name", "amount", "due_date", "category", 
  "payment_method", "payment_status", "cleared_bank", "notes")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING "id";
  `;
  pool.query(insertBillQuery, [
    req.user.id, 
    req.body.newBill.name, 
    Number(req.body.newBill.amount), 
    req.body.newBill.due_date, 
    req.body.newBill.category, 
    req.body.newBill.payment_method, 
    req.body.newBill.payment_status, 
    req.body.newBill.cleared_bank, 
    req.body.newBill.notes] )
    .then((result) => {
    console.log('Response in POST:', result);
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.sendStatus(503);
  })
});

// /** 
// PUT route 
//  */

router.put('/:id', (req, res) => {
  // console.log('Put: ', req.body.newBill);
  console.log('Params', req.params.id);
  // Update this single bill
  // const billToUpdate = req.params.id;
  const queryText = `UPDATE bill_data SET "name" = $1, "amount" = $2, "due_date" = $3,
  "category" = $4, "payment_method" = $5, "payment_status" = $6, "cleared_bank" = $7, 
  "notes" = $8 WHERE id = $9 AND user_id = $10`;
  // console.log('Put queryText', queryText);
  pool.query(queryText, [
    req.body.name, 
    req.body.amount, 
    req.body.due_date, 
    req.body.category,
    req.body.payment_method, 
    req.body.payment_status, 
    req.body.cleared_bank,
    req.body.notes, 
    req.params.id, 
    req.body.user_id])
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log(`Error making database query ${queryText}`, error);
          res.sendStatus(500);
      });
});


// DELETE ROUTE
router.delete('/:id', (req, res) => {
  let queryText = `DELETE FROM "bill_data" WHERE "id" = $1;`;
  pool
      .query(queryText, [req.params.id])
      .then((result) => {
          console.log('delete result', result);
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log('Error completing DELETE exercise query:', error);
          res.sendStatus(500);
      });
});

module.exports = router;
