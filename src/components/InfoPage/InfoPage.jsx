import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="formPanel" >
      <h2>Info Page</h2>
      <p>
        <b>Thanks to Everyone Who Contributed to this App: </b>
         Thank you to the Instructors of Prime, especially Casie Siekman, Chris Black, and Peter DeMaio!
      </p>
      <p>
        Thanks to my fellow Lydian cohort-mates: we've all come along way, and I am so glad to have you all in my corner
      </p>
      <p>Get to know me professionally by scanning my QR code and visiting my <b>LinkedIn profile</b>:</p>
      <img src="/images/qr-to-LinkedIn.png" alt="LinkedIn QR code" className='center' />
    </div>
  );
}

export default InfoPage;
