// This component allows the user to Add/Edit a bill to their tracker
// So far it is adding a bill, the edit function will be added later

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import '../App/App.css';



function EditBill() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // access to the redux store from the billReducer
  const edit = useSelector((store) => store.editReducer);

  const [startDate, setStartDate] = useState(new Date());
  // const [heading, setHeading] = useState('Add Bill');

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [due_date, setDue_date] = useState('03-07-2023');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBill = {
      checked,
      name,
      amount,
      due_date,
      category,
      paymentMethod,
      note
    }
    if ( id) {
      // EDIT AN EXISTING BILL
      dispatch({ 
        type: 'EDIT_BILL', 
        payload: edit, history});
    } else {
      // ADD A BILL
      // Pass history with our dispatch so that the saga can redirect
      dispatch({ 
        type: 'POST_BILLS', 
        payload: {newBill}, history });
    }
  
  };

  function toggle(value){
    return !value;
  }

  const cancelBill = () => {
        history.push('/bills');
  }

  useEffect(() => {
    if (id) {   // Return false if id is undefined
      axios.get(`/api/bills/${id}`).then(response => {
        const bill = response.data;
        setName(bill.name);
        setAmount(bill.amount);
        setDue_date(bill.due_date);
      }).catch(error => {
        console.log(error);
        // alert('Something went wrong!');
      })
    } // else do nothing
  }, [id]);

  return (
    <section>
      <div>
        {id ? <h2>Edit Bill</h2> : <h2>Add Bill</h2>}
        <form className='formPanel' onSubmit={handleSubmit}>
          <label htmlFor="paid">Paid</label>
          <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(toggle)}
          />
          <label htmlFor="name">Name:</label>
          <input
            className="input"
            type="text"
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
            // placeholder="e.g. 100.00"
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
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <label htmlFor="bill-category">Category:</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. Utilities"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          <label htmlFor="bill-payment-method">Payment Method:</label>
          {/* <select></select> */}
          <input
            className="input"
            type="text"
            placeholder="e.g. Credit Card"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />

          <label htmlFor="bill-note">Note</label>
          <input
            className="input"
            type="text"
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