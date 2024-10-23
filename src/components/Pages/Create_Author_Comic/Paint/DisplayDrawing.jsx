import React from 'react';

const DisplayDrawing = ({ drawing }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Saved Drawing</h2>
      {drawing ? (
        <img src={drawing} alt="Your Drawing" style={{ border: '2px solid #000', borderRadius: '8px' }} />
      ) : (
        <h3>No Drawing Saved</h3>
      )}
    </div>
  );
};

export default DisplayDrawing;
