import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchReminder() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.get('/api/reminder', config);
      yield put({ type: 'SET_REMINDER', payload: response.data });
    } catch (err) {
      console.log('fetchReminder failed.', err);
    }
}


function* reminderSaga() {
    yield takeLatest('FETCH_ITEM', fetchItem);
    yield takeLatest('ADD_ITEM', AddHomeItem);
    
  }
  
  export default reminderSaga;