// This file requests the bill_data from database in the axios.get

import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_BILL" actions
function* fetchBills() {
    console.log('here in the fetchBill generator function'); 
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/bills', config);
    console.log('RESPONSE', response.data);

    yield put({ type: 'GET_BILLS', payload: response.data });
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

// function* deleteBill() {

// }

// worker Saga: will be fired on "POST_BILL" actions
function* editBill() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.put('/api/bills/:id', config);
    console.log('editSaga response:', );
    
    action.history.push('/bills');

    yield put({ type: 'UPDATE_BILL', payload: response.data });
  } catch (error) {
    console.log('User POST request failed', error);
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
  // yield takeEvery('DELETE_BILL', deleteBill);
  yield takeEvery('EDIT_BILL', editBill);
}

export default billSaga;


