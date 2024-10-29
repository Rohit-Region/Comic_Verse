import React, { useRef, useState, useEffect } from 'react';

const FullEditor = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('draw');  // Can be 'draw', 'image', or 'text'
  const [drawing, setDrawing] = useState(false);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textSize, setTextSize] = useState(20);
  const [textDragging, setTextDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 });
  const [imageDimensions, setImageDimensions] = useState({ width: 200, height: 200 });
  const [imageDragging, setImageDragging] = useState(false);

  useEffect(() => {
    drawCanvas();
  }, [uploadedImage, text, textPosition, textSize, imagePosition, imageDimensions]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    if (uploadedImage) {
      const img = new Image();
      img.src = URL.createObjectURL(uploadedImage);
      img.onload = () => {
        ctx.drawImage(
          img,
          imagePosition.x,
          imagePosition.y,
          imageDimensions.width,
          imageDimensions.height
        );
      };
    }

    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(text, textPosition.x, textPosition.y);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (mode === 'draw') {
      setDrawing(true);
    } else if (mode === 'text' &&
      offsetX >= textPosition.x &&
      offsetX <= textPosition.x + ctx.measureText(text).width &&
      offsetY >= textPosition.y - textSize &&
      offsetY <= textPosition.y
    ) {
      setTextDragging(true);
    } else if (mode === 'image' &&
      offsetX >= imagePosition.x &&
      offsetX <= imagePosition.x + imageDimensions.width &&
      offsetY >= imagePosition.y &&
      offsetY <= imagePosition.y + imageDimensions.height
    ) {
      setImageDragging(true);
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    setTextDragging(false);
    setImageDragging(false);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');

    if (drawing && mode === 'draw') {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else if (textDragging && mode === 'text') {
      setTextPosition({ x: offsetX, y: offsetY });
    } else if (imageDragging && mode === 'image') {
      setImagePosition({ x: offsetX, y: offsetY });
    }
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

  return (
    <div>
      <h2>Enhanced Editor with Drawing, Image, and Text Modes</h2>

      <div>
        <label>Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="draw">Draw</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {mode === 'text' && (
          <>
            <input type="text" placeholder="Enter text" value={text} onChange={handleTextChange} />
            <label>Text Size:</label>
            <input
              type="range"
              min="10"
              max="100"
              value={textSize}
              onChange={handleTextSizeChange}
            />
          </>
        )}

        {mode === 'image' && (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <label>Image Width:</label>
            <input
              type="range"
              min="50"
              max="500"
              value={imageDimensions.width}
              onChange={(e) => handleImageResize(e, 'width')}
            />
            <label>Image Height:</label>
            <input
              type="range"
              min="50"
              max="500"
              value={imageDimensions.height}
              onChange={(e) => handleImageResize(e, 'height')}
            />
          </>
        )}
      </div>

      <div
        style={{
          border: '1px solid black',
          display: 'inline-block',
          cursor: textDragging || imageDragging ? 'move' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas ref={canvasRef} width={800} height={600} />
      </div>
    </div>
  );
};

export default FullEditor;
