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

  function* AddMaintenanceItem(action) {
    console.log('added item payload:', action.payload)
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        yield axios.post('/api/item', action.payload, config);
        yield put({type: 'FETCH_ITEM'});
        yield put({ type: 'SET_ITEM', payload: action.payload});
      } catch (error) {
        console.log('AddMaintenanceItem failed:', error);
      }
    }

function* itemSaga() {
    yield takeLatest('FETCH_ITEM', fetchItem);
    yield takeLatest('ADD_ITEM', AddMaintenanceItem);

  }
  
  export default itemSaga;