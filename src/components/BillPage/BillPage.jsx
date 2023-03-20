import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TableContainer,
         Table,
         TableHead,
         TableBody,
         TableRow,
         TableCell,
         Paper,
         Checkbox,
         Button,
         styled,
    } from '@mui/material/';
 import  IconButton from '@mui/material/IconButton';
 import DeleteIcon from '@mui/icons-material/Delete';

import '../App/App.css';

// import '../BillPage.css';


function BillPage() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const bills = useSelector(store => store.billReducer);
    const user = useSelector((store) => store.user);

    const StyledTableCell = styled(TableCell)`
            width: 100;
            max-width: 100;
            overflow: visible;
            text-overflow: ellipsis;
        `;
  
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
        let total = 0;
        bills.map(bill => {
            if (bill.cleared_bank === true) {
                total += Number(bill.amount)
            }
        })
        return total;
    }

    const waitingToClear = () => {
        return totalPaid() - totalCleared();
      }
    

  return (
    <section>
        <div className="container">
            <h2 className="whiteLetter">Bills List</h2>
            <button className="add-btn" onClick={handleAdd}>Add Bill</button>
        </div>
        {/* <div className='container'>
            <h3>Overdue Bills</h3>
            <hr />
        </div> */}
        <div style={{ width: '100%' }}>
        <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
           <Table aria-label='Bills Table' stickyHeader>
            <TableHead >
                <TableRow >
                    <StyledTableCell>Paid</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Due Date</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bills.map(bill => (
                    <TableRow
                        key={bill.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell>
                            <Checkbox checked={bill.payment_status} />
                        </StyledTableCell>
                        <StyledTableCell onClick={() => handleBillClick(bill)}>{bill.name}</StyledTableCell>
                        <StyledTableCell>{bill.amount}</StyledTableCell>
                        <StyledTableCell>{bill.due_date}</StyledTableCell>
                        <StyledTableCell>
                            {/* <Button variant='contained' onClick={() => handleDelete(bill)}>Delete</Button> */}
                            <IconButton aria-label='delete' onClick={() => handleDelete(bill)}>
                                <DeleteIcon/ >
                            </IconButton>
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
           </Table>

        </TableContainer>
        </div>
         {/* <div className="table"> */}
            {/* <h3>Unpaid Bills</h3>
            <hr />
            <thead>
                <tr>
                    <th>Paid</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Delete</th>
                </tr>
            </thead> */}
             {/* <tbody id="billsTableBody"> */}
            
            {/* This bit below will map over bills if there are bills, otherwise nothing happens */}
            {/* {bills.map(bill => {
                return (
                <tr className="bill-line" key={bill.id} >
                    <td>  
                        <input
                    type="checkbox"
                    checked={bill.payment_status}
                    /></td>
                    <td className='name' onClick={() => handleBillClick(bill)}>{bill.name}</td>
                    <td>{bill.amount}</td>
                    <td>{bill.due_date}</td>
                    <td>
                        <button className="delete" onClick={() => handleDelete(bill)}>Delete</button>
                    </td>
                </tr>
                )
            })} */}
             {/* </tbody> */}
            
         {/* </div> */}
        <div>
            <h3 className="whiteLetter">Paid Bills: ${totalPaid()}</h3>
            <hr/>
        </div>
        <div>
            <h3 className="whiteLetter">Cleared Bills: ${totalCleared()}</h3>
            <hr/>
        </div>
        <div>
            <h3 className="whiteLetter">Waiting to Clear: ${waitingToClear()}</h3>
        </div>
    </section>
  );
}

export default BillPage;
