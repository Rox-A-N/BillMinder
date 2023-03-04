// This file requests the bill_data from database in the axios.get

import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

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

function* billSaga() {
  yield takeEvery('FETCH_BILLS', fetchBills);
}

export default billSaga;


