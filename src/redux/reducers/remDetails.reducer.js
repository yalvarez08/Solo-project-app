const remDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_REM_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
 
  export default remDetails;