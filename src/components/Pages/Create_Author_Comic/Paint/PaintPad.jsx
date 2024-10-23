import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

const PaintPad = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(4);

  const handleClear = () => {
    canvasRef.current.clear();
  };

  const handleUndo = () => {
    canvasRef.current.undo(); 
  };

  const handleSave = () => {
    const canvasData = canvasRef.current.getDataURL(); // Get the image data URL
    onSave(canvasData); // Pass it to the parent component
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Painting Pad</h2>

      {/* Canvas Area */}
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        lazyRadius={0}
        canvasWidth={800}
        canvasHeight={400}
        style={{ border: '2px solid #000', borderRadius: '8px' }}
      />

      {/* Controls for Brush Color and Radius */}
      <div style={{ marginTop: '20px' }}>
        <label>
          Brush Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Brush Radius:
          <input
            type="range"
            min="1"
            max="10"
            value={brushRadius}
            onChange={(e) => setBrushRadius(Number(e.target.value))}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      {/* Control Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleClear} style={{ marginRight: '10px' }}>
          Clear
        </button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleSave}>Save Drawing</button>
      </div>
    </div>
  );
};

export default PaintPad;
