import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';
// import '../BillPage.css';


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function BillPage() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const bills = useSelector(store => store.billReducer);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_BILLS' });
    }, []);

    const handleBillClick = (bill) => {
        // event.preventDefault();
        console.log(`Clicked on bill with id: ${bill.id}`);
        history.push('/edit');
    }

  return (
    <section>
        <div className="container">
        <h2>Bills</h2>
        {/* <h3>Name</h3>
        <h3>Amount</h3>
        <h3>Due Date</h3> */}
        {/* { JSON.stringify(bills)} */}
        </div>
        <div className='container'>
            <h3>Overdue Bills</h3>
            <hr />
        </div>
        <div className="container">
            <h3>Unpaid Bills</h3>
            <hr />
            
            {/* This bit below will map over bills if there are bills, otherwise nothing happens */}
            {bills.map(bill => {
                return (
                <div className="bill-line" key={bill.id} onClick={() => handleBillClick(bill)}>
                    <p className='name'>{bill.name}</p>
                    <p>{bill.amount}</p>
                    <p>{bill.due_date}</p>
                    {/* <button className="submit" type='submit'>Edit</button> */}
                </div>
                )
            })}

        </div>
        <div>
            <h3>Paid Bills</h3>
            <hr />
        </div>
        <div>
            <label>Breakdown</label>
        </div>
    </section>
  );
}

export default BillPage;
