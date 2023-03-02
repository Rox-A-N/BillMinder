// This will fire off the action to post to db

const editReducer = (state = [], action) => {
    console.log('in editReducer', action.payload);
    switch (action.type) {
      case 'POST_BILL':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.bills
  export default editReducer;