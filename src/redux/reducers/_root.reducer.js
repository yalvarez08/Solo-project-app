import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import item from './item.reducer';
import itemDetails from './itemDetails.reducer';

// rootReducer is the primary reducer for our entire project
const rootReducer = combineReducers({
  errors, 
  user, 
  item,
  itemDetails,
});

export default rootReducer;
