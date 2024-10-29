import React, { useRef, useState, useEffect } from 'react';

const FullEditor = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('draw'); // Modes: 'draw', 'text', 'image'
  const [drawMode, setDrawMode] = useState('draw'); // Sub-modes for drawing: 'draw' or 'move'
  const [drawing, setDrawing] = useState(false);
  const [drawings, setDrawings] = useState([]); // Stores drawings
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState('black');
  const [textMove, setTextMove] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 });
  const [imageDimensions, setImageDimensions] = useState({ width: 200, height: 200 });
  const [imageMove, setImageMove] = useState(false);
  const [drawColor, setDrawColor] = useState('black'); // Default drawing color
  const [backgroundColor, setBackgroundColor] = useState('white'); // Default background color

  useEffect(() => {
    drawCanvas();
  }, [drawings, uploadedImage, text, textPosition, textSize, textColor, imagePosition, imageDimensions, backgroundColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set the background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the uploaded image first
    if (uploadedImage) {
      const img = new Image();
      img.src = URL.createObjectURL(uploadedImage);
      img.onload = () => {
        ctx.drawImage(img, imagePosition.x, imagePosition.y, imageDimensions.width, imageDimensions.height);
        drawTextAndDrawings(ctx); // Call to draw text and drawings after image is drawn
      };
    } else {
      drawTextAndDrawings(ctx); // Draw text and drawings if there's no image
    }
  };

  const drawTextAndDrawings = (ctx) => {
    // Draw all stored drawings
    drawings.forEach(({ points }) => {
      ctx.strokeStyle = drawColor; // Use the selected drawing color
      ctx.beginPath();
      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Draw the text
    ctx.fillStyle = textColor; // Use the selected text color
    ctx.font = `${textSize}px Arial`;
    ctx.fillText(text, textPosition.x, textPosition.y);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (mode === 'draw' && drawMode === 'draw') {
      setDrawing(true);
      setDrawings((prevDrawings) => [...prevDrawings, { points: [[offsetX, offsetY]] }]);
    } else if (mode === 'draw' && drawMode === 'move') {
      const drawingIndex = drawings.findIndex(({ points }) =>
        points.some(([x, y]) => Math.hypot(x - offsetX, y - offsetY) < 10)
      );
      if (drawingIndex !== -1) setSelectedDrawing(drawingIndex);
    } else if (mode === 'text' && textMove) {
      setTextPosition({ x: offsetX, y: offsetY });
    } else if (mode === 'image' && imageMove) {
      setImagePosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (drawing && drawMode === 'draw') {
      const updatedDrawings = [...drawings];
      const lastDrawing = updatedDrawings[updatedDrawings.length - 1];
      lastDrawing.points.push([offsetX, offsetY]);
      setDrawings(updatedDrawings);
    } else if (selectedDrawing !== null && drawMode === 'move') {
      const updatedDrawings = [...drawings];
      const deltaX = offsetX - updatedDrawings[selectedDrawing].points[0][0];
      const deltaY = offsetY - updatedDrawings[selectedDrawing].points[0][1];
      updatedDrawings[selectedDrawing].points = updatedDrawings[selectedDrawing].points.map(
        ([x, y]) => [x + deltaX, y + deltaY]
      );
      setDrawings(updatedDrawings);
    } else if (textMove) {
      setTextPosition({ x: offsetX, y: offsetY });
    } else if (imageMove) {
      setImagePosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    setSelectedDrawing(null);
    setTextMove(false);
    setImageMove(false);
  };

  const handleTextChange = (e) => setText(e.target.value);
  const handleTextSizeChange = (e) => setTextSize(parseInt(e.target.value));
  const handleImageUpload = (e) => setUploadedImage(e.target.files[0]);
  const handleImageResize = (e, dimension) => {
    setImageDimensions((prev) => ({
      ...prev,
      [dimension]: parseInt(e.target.value),
    }));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas-image.png'; // Name for the downloaded file
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <h2>Full Editor with Moveable Text, Image, and Drawings</h2>

      <div>
        <label>Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="draw">Draw</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {mode === 'draw' && (
          <>
            <label>Draw Color:</label>
            <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} />
            <button onClick={() => setDrawMode(drawMode === 'draw' ? 'move' : 'draw')}>
              Toggle to {drawMode === 'draw' ? 'Move' : 'Draw'}
            </button>
          </>
        )}

        {mode === 'text' && (
          <>
            <label>Text Color:</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            <input type="text" placeholder="Enter text" value={text} onChange={handleTextChange} />
            <label>Text Size:</label>
            <input type="range" min="10" max="100" value={textSize} onChange={handleTextSizeChange} />
            <button onClick={() => setTextMove((prev) => !prev)}>
              {textMove ? 'Disable Move' : 'Enable Move'}
            </button>
          </>
        )}

        {mode === 'image' && (
          <>
            <label>Image Color:</label>
            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <label>Image Width:</label>
            <input type="range" min="50" max="500" value={imageDimensions.width} onChange={(e) => handleImageResize(e, 'width')} />
            <label>Image Height:</label>
            <input type="range" min="50" max="500" value={imageDimensions.height} onChange={(e) => handleImageResize(e, 'height')} />
            <button onClick={() => setImageMove((prev) => !prev)}>
              {imageMove ? 'Disable Move' : 'Enable Move'}
            </button>
          </>
        )}
      </div>

      <div
        style={{
          border: '1px solid black',
          display: 'inline-block',
          cursor: drawMode === 'move' || textMove || imageMove ? 'move' : 'crosshair',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas ref={canvasRef} width={800} height={600} />
      </div>

      <button onClick={downloadImage}>Download Canvas as Image</button>
    </div>
  );
};

export default FullEditor;
