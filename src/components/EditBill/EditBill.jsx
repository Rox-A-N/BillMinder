// This component allows the user to Add/Edit a bill to their tracker
// So far it is adding a bill, the edit function will be added later

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import '../App/App.css';

function EditBill() {
  const dispatch = useDispatch();
  const history = useHistory();

  // access to the redux store from the billReducer
  const edit = useSelector((store) => store.billReducer);

  const [startDate, setStartDate] = useState(new Date());
  const [heading, setHeading] = useState('Add Bill');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [due_date, setDue_date] = useState('03-07-2023');
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
        <form className='formPanel' onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className="input"
            type="text"
            // id="bill-name"
            placeholder="e.g. Rent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="amount">Amount:</label>
          <input
            className="input"
            type="number"
            min="0.01" 
            step="0.01" 
            max="10000"
            // id="bill-amount"
            placeholder="e.g. 100.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <label htmlFor="bill-due-date">Due Date:</label>
          {/* original date picker */}
          {/* <input type="date" id="start" 
            
            min="01-01-2023" >
          </input> */}

          <DatePicker
            dateFormat="MM/dd/yyyy"
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <label htmlFor="bill-category">Category:</label>
          <input
            className="input"
            type="text"
            // id="bill-category"
            placeholder="e.g. Utilities"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <label htmlFor="bill-payment-method">Payment Method:</label>
          <input
            className="input"
            type="text"
            // id="bill-payment-method"
            placeholder="e.g. Credit Card"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />

          <label htmlFor="bill-note">Note</label>
          <input
            className="input"
            type="text"
            // id="bill-note"
            placeholder="e.g. info on bill"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            />
            <button className="btn" type='Submit'>Save</button>
            <div className="divider"></div>
            <button className="btn" onClick={cancelBill}>Cancel</button>
        </form>
      </div>
    </section>
  )};

  export default EditBill;