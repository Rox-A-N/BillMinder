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

  const [heading, setHeading] = useState('Edit Bill Component');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in Edit Bill Submit', props);
    submitBill();
  }

  const submitBill = () => {
    history.push('/user');
  }

  return (
    <div>
      <h2>{heading}</h2>
      <button className="Submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default EditBill;