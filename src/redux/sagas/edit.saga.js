// Saga to post to db

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_BILL" actions
function* postBill() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.post('/api/bills', config);
    console.log('editSaga response:', response.data);

    yield put({ type: 'SET_BILL', payload: response.data });
  } catch (error) {
    console.log('User POST request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('POST_BILL', postBill);
}

export default userSaga;
