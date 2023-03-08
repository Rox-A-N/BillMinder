// This file requests the bill_data from database in the axios.get

import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_BILL" actions
function* fetchBills() {
    // console.log('here in the fetchBill generator function'); // test console.log
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

function* postBills(action) {
  console.log('New Bill: ', action.payload);
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
    yield fetchBills({type: 'FETCH_BILLS', payload: action.payload});
  } catch (error) {
    console.log('error posting', error);
  }
}

// watcher saga listens for the 'FETCH_BILLS' action to be dispatched
// from the BillPage.jsx, 
//then runs'fetchBills' saga
function* billSaga() {
  yield takeEvery('FETCH_BILLS', fetchBills);
  yield takeEvery('POST_BILLS', postBills);
}

export default billSaga;


