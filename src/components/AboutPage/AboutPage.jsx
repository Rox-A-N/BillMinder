import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1 className="whiteLetter">This is the way to keep your balances in check!</h1>
      </div>
      <div className="grid">
        <div className="grid-col grid-col_12">
        <p className="whiteLetter">
          Not all of us want to connect our banking information to an app. 
          And some of our banks can't be found.</p>

          <p className="whiteLetter">
           With BillMinder you can track when your bills have been paid, 
           and when they have cleared your bank!
          </p>

          <p className="whiteLetter">
            No more "guesstimating", now you can be sure of your finances.
          </p>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default AboutPage;
