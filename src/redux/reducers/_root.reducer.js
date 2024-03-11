import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import item from './item.reducer';

// rootReducer is the primary reducer for our entire project
const rootReducer = combineReducers({
  errors, 
  user, 
  item,
});

export default rootReducer;
