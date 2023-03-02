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
    <div className="container">
      <p>Bills</p>
      { JSON.stringify(bills)}
    </div>
  );
}

export default BillPage;
