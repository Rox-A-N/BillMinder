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

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/bills', config);
    console.log('RESPONSE', response.data);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'GET_BILLS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* billSaga() {
  yield takeEvery('FETCH_BILLS', fetchBills);
}

export default billSaga;
