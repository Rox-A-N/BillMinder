import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const user = useSelector((store) => store.user);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log('the edit button has been clicked by user', user);
    routeToEditBill();
  }

  const routeToEditBill = () => {
    history.push('/edit');
  }

  return (
    <>
      <button className="edit" onClick={handleEdit}>Add Bill</button>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
