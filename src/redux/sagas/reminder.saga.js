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

function* AddReminder(action) {
  console.log('added reminder payload:', action.payload)
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      yield axios.post('/api/reminder', action.payload, config);
      yield put({type: 'FETCH_REMINDER'});
    } catch (err) {
      console.log('AddReminder failed:', err);
    }
}



function* reminderSaga() {
    yield takeLatest('FETCH_REMINDER', fetchReminder);
    yield takeLatest('ADD_REMINDER', AddReminder);

  }
  
  export default reminderSaga;