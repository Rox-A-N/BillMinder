import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';
// import '../BillPage.css';


function BillPage() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const bills = useSelector(store => store.billReducer);
    const user = useSelector((store) => store.user);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_BILLS' });
    }, []);

    const handleAdd = (event) => {
        event.preventDefault();
        console.log('the add button has been clicked by user', user);
        routeToAddBill();
      }
    
      const routeToAddBill = () => {
        history.push('/add');
      }

    const handleBillClick = (bill) => {
        // event.preventDefault();
        console.log(`Clicked on bill with id: ${bill.id}`);
        history.push(`/edit/${bill.id}`);
    }

    const handleDelete = (bill) => {
        console.log(`Delete clicked at: ${bill.id}` );
        dispatch({ 
            type: 'DELETE_BILL',
            payload: bill.id
        })
    }

    const totalPaid = () => {
        let total = 0;
        bills.map(bill => {
            if (bill.payment_status === true) {
                total += Number(bill.amount)
            }
        })
        return total;
    }

    const totalCleared = () => {

    }

  return (
    <section>
        <div className="container">
        <h2>Bills List</h2>
        <button className="btn" onClick={handleAdd}>Add Bill</button>
        {/* <h3>Name</h3>
        <h3>Amount</h3>
        <h3>Due Date</h3> */}
        {/* { JSON.stringify(bills)} */}
        </div>
        {/* <div className='container'>
            <h3>Overdue Bills</h3>
            <hr />
        </div> */}
        <div className="container">
            {/* <h3>Unpaid Bills</h3> */}
            <hr />
            <table>
            <thead>
                <tr>
                    <th>Paid</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="billsTableBody">
            
            {/* This bit below will map over bills if there are bills, otherwise nothing happens */}
            {bills.map(bill => {
                return (
                <tr className="bill-line" key={bill.id} >
                    <td>  
                        <input
                    type="checkbox"
                    checked={bill.payment_status}
                    //   onChange={() => {
                    //     console.log('setChecked function called with argument:'); 
                    //     setPaid(!paid)}}
                    /></td>
                    <td className='name' onClick={() => handleBillClick(bill)}>{bill.name}</td>
                    <td>{bill.amount}</td>
                    <td>{bill.due_date}</td>
                    <td>
                        <button className="delete" onClick={() => handleDelete(bill)}>Delete</button>
                    </td>
                </tr>
                )
            })}
            </tbody>
            </table>
        </div>
        <div>
            <h3>Paid Bills</h3>
            <hr />
            <p>{totalPaid()}</p>
        </div>
        {/* <div>
            <label>Breakdown</label>
        </div> */}
    </section>
  );
}

export default BillPage;
