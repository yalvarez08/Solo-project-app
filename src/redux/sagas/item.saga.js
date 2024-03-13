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
      console.log('fetchItem failed.', err);
    }
}

function* AddHomeItem(action) {
    console.log('added item payload:', action.payload)
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
    
      yield axios.post('/api/item', action.payload, config);
      yield put({type: 'FETCH_ITEM'});
    } catch (err) {
      console.log('AddHomeItem failed:', err);
    }
}

function* DeleteHomeItem(action) {
  console.log('deleted item:', action.payload)
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
  
    yield axios.delete(`/api/item/${action.payload.id}`, config);
    yield put({type: 'FETCH_ITEM'});
  } catch (err) {
    console.log('DeleteHomeItem failed:', err);
  }
}

function* itemSaga() {
    yield takeLatest('FETCH_ITEM', fetchItem);
    yield takeLatest('ADD_ITEM', AddHomeItem);
    yield takeLatest('DELETE_ITEM', DeleteHomeItem);
  }
  
  export default itemSaga;