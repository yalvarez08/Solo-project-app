import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchItemDetails(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const detailsResponse = yield axios.get(`/api/item/${action.payload}`, config);
      yield put({ type: 'SET_ITEM_DETAILS', payload: detailsResponse.data });
    } catch (err) {
      console.log('fetchItemDetails failed.', err);
    }
  }

  function* itemDetailsSaga() {
    yield takeLatest('FETCH_ITEM_DETAILS', fetchItemDetails);
    

  }
  
  export default itemDetailsSaga;