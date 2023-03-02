import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function BillPage() {
    const dispatch = useDispatch();

    const bills = useSelector(store => store.bill);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_BILLS' });
    }, [dispatch]);

  return (
    <section>
        <div className="container">
        <h2>Bills</h2>
        {/* { JSON.stringify(bills)} */}
        </div>
        <div>
            <h3>Overdue Bills</h3>
        </div>
        <div>
            <h3>Unpaid Bills</h3>
        </div>
        <div>
            <h3>Paid Bills</h3>
        </div>
        <div>
            <label>Breakdown</label>
        </div>
    </section>
  );
}

export default BillPage;
