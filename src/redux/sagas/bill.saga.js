// This file requests the bill_data from database in the axios.get

import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_BILL" actions
function* fetchBills() {
    // console.log('here in the fetchBill generator function'); 
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const bill = yield axios.get('/api/bills', config);
    console.log('fetchBill: bill ', bill.data);

    yield put({ type: 'GET_BILLS', payload: bill.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* addBills(action) {
  // console.log('New Bill: ', action.payload);
  // wrap in try/catch
  // yield post request
  // yield 'put' to reducer
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.post('/api/bills', action.payload);
    // console.log('in the axios.post', action.payload);
    yield put({type: 'FETCH_BILLS'});
    action.history.push('/bills');
  } catch (error) {
    console.log('error posting', error);
  }
}

function* deleteBill(action) {
  console.log('delete payload', action.payload);
  const id = action.payload;
  console.log('id payload', id);
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.delete(`/api/bills/${id}`, config);

    yield put({ type: 'FETCH_BILLS'});    // This will give user the updated list of bills
  } catch (error) {
    console.log('Error delete route', error);
  }
}

// worker Saga: will be fired on "EDIT_BILL" actions
function* editBill(action) {
  console.log('action.payload:', action.payload);
  try {

    yield axios.put(`/api/bills/${action.payload.id}`, action.payload);
    console.log('editSaga response:', action.payload.id);
    
    action.history.push('/bills');
    yield put({ type: 'FETCH_BILLS' }); // originally this was 'UPDATE_BILL' to pass to edit.reducer
  } catch (error) {
    console.log('User Edit request failed', error);
  }
}


// watcher saga listens for the 'FETCH_BILLS' action to be dispatched
// from the BillPage.jsx, 
//then runs'fetchBills' saga
// watcher sage listens for the 'POST_BILLS' type to be dispatched from
// the EditBill page, then runs postBills
function* billSaga() {
  yield takeEvery('FETCH_BILLS', fetchBills);
  yield takeEvery('POST_BILLS', addBills);
  yield takeEvery('DELETE_BILL', deleteBill);
  yield takeEvery('EDIT_BILL', editBill);
}

export default billSaga;


