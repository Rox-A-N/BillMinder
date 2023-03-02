// This component allows the user to Add/Edit a bill to their tracker

import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditBill(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  const [heading, setHeading] = useState('Add Bill Component');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in Edit Bill Submit');
    submitBill();
  }

  const submitBill = () => {
    history.push('/bills');
  }

  return (
    <section>
      <div>
        <h2>{heading}</h2>
        <form>
          <label>Name:
          <input placeholder='bill name' />
          </label>

          <label>Amount:
          <input type='number' placeholder='amount' />
          </label>

          <label>Due Date:
          <input type='date' />
          </label>

          <label>Category:
          <input />
          </label>

          <label>Recurring:
          <input placeholder='monthly/one-time' />
          </label>

          <label>Payment Method:
          <input placeholder='account' />
          </label>

          <label>Note:
          <input type='text' placeholder='comments' />
          </label>
        </form>

        <button className="Submit" onClick={handleSubmit}>Save</button>
        <button className="Cancel" onClick={submitBill}>Cancel</button>
      </div>
    </section>
  );
}

export default EditBill;