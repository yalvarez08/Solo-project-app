import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import item from './item.reducer';
import itemDetails from './itemDetails.reducer';
import updateItem from './update.reducer';
import reminder from './reminder.reducer';
import remDetails from './remDetails.reducer';

// rootReducer is the primary reducer for our entire project
const rootReducer = combineReducers({
  errors, 
  user, 
  item,
  itemDetails,
  updateItem,
  reminder,
  remDetails,
});

export default rootReducer;
