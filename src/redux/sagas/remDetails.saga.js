import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRemDetails(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const detailsResponse = yield axios.get(`/api/reminder/`, config);
      yield put({ type: 'SET_REM_DETAILS', payload: detailsResponse.data[0] });
    } catch (err) {
      console.log('fetchRemDetails failed.', err);
    }
  }

  function* remDetailsSaga() {
    yield takeLatest('FETCH_REM_DETAILS', fetchRemDetails);
    

  }
  
  export default remDetailsSaga;