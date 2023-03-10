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


  // saw this solution: 
// switch (action.type) {
// case 'FETCH BILL':
// -- HANDLE THE FETCH_BILLS action--
//  return state; // return the updated state
//
//  case 'ADD_BILL':
// --HANDLE THE ADD_BILL action--
//  return [...state, action.payload]; --return the updated state with the new bill
//
//  case 'DELETE_BILL':
//  --HANDLE THE DELETE_BILL action--
//  return state.filter(bill => bill.id !== action.payload.id); --return the updated state without the deleted bill
//
//  default:
//      return state;
// }

  