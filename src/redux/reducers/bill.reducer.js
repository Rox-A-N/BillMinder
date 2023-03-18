// Defining 'bill' in the Redux store to be accessed by the BillPage component
// action parameter of billReducer has two properties: payload & type

const billReducer = (state = [], action) => {
    console.log('in billReducer', action.payload);
    switch (action.type) {
      case 'GET_BILLS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.bills
  export default billReducer;



  