// This component allows the user to Add/Edit a bill to their tracker
// So far it is adding a bill, the edit function will be added later

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditBill() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const store = useSelector((store) => store);

  const [heading, setHeading] = useState('Add Bill');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [due_date, setDue_date] = useState('2023-03-07');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBill = {
      name,
      amount,
      due_date,
      category,
      paymentMethod,
      note
    }
    dispatch({ type: 'POST_BILLS', payload: {newBill} });
    history.push('/bills');
  };

  const cancelBill = () => {
        history.push('/bills');
  }

  return (
    <section>
      <div>
        <h2>{heading}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            // id="bill-name"
            placeholder="e.g. Rent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            // id="bill-amount"
            placeholder="e.g. 1000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <label htmlFor="bill-due-date">Due Date:</label>
          <input
            type="date"
            // id="bill-due-date"
            value={due_date}
            onChange={(event) => setDue_date(event.target.value)}
          />

          <label htmlFor="bill-category">Category:</label>
          <input
            type="text"
            // id="bill-category"
            placeholder="e.g. Utilities"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <label htmlFor="bill-payment-method">Payment Method:</label>
          <input
            type="text"
            // id="bill-payment-method"
            placeholder="e.g. Credit Card"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />

          <label htmlFor="bill-note">Note</label>
          <input
            type="text"
            // id="bill-note"
            placeholder="e.g. info on bill"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            />
            <button className="Submit" type='Submit'>Save</button>
            <button className="Cancel" onClick={cancelBill}>Cancel</button>
        </form>
      </div>
    </section>
  )};

  export default EditBill;