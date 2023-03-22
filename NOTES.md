## This is to put in a date picker (JM), can be used for the due date on each bill:

<label>Date</label>
<input type='date' className='date'  />


## React Date Picker

### Put the const in the page function
  const [startDate, setStartDate] = useState(new Date());

### Put the code from inside the return in place of existing Date Picker
  
  return (
    <DatePicker
      dateFormat="MM/dd/yyyy"
      selected={startDate}
      onChange= {(date) => setStartDate(date)}
    />
  );

### With Calender Icon
   
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      showIcon 
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );

  this didn't produce an icon^

    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>





