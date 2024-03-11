import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchItem() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.get('/api/item', config);

      yield put({ type: 'SET_ITEM', payload: response.data });
    } catch (err) {
      console.log('item GET request failed', err);
    }
  }

function* itemSaga() {
    yield takeLatest('FETCH_ITEM', fetchItem);
  }
  
  export default itemSaga;