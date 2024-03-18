const reminderReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REMINDER':
        return action.payload;
      default:
        return state;
    }
  };
  
 
  export default reminderReducer;