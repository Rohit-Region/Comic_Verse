import React, { useState } from 'react';
import PaintPad from './PaintPad';
import DisplayDrawing from './DisplayDrawing';

const PaintMain = () => {
  const [drawing, setDrawing] = useState(null); // State to hold the drawing

  const handleSaveDrawing = (drawingData) => {
    setDrawing(drawingData); // Save the drawing data in state
  };

  return (
    <div>

      <h1 style={{margin:'20px'}}>Welcome to the Painting App</h1>
      <PaintPad onSave={handleSaveDrawing} /> {/* Pass the save function */}
      <DisplayDrawing drawing={drawing} /> {/* Pass the drawing data */}
    </div>
  );
};

export default PaintMain;
