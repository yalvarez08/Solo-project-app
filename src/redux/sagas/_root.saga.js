import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import itemSaga from './item.saga';
import reminderSaga from './reminder.saga';
import remDetailsSaga from './remDetails.saga';
import itemDetailsSaga from './itemDetails.saga';

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    itemSaga(),
    itemDetailsSaga(),
    reminderSaga(),
    remDetailsSaga(),
  ]);
}
