const updateItem = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UPDATE':
          return action.payload;
        case 'UPDATE_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            }
        case 'CLEAR_UPDATE':
            return {};
        default:
          return state;
      }
}

export default updateItem