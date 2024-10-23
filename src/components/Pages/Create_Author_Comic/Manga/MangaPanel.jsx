import React from 'react';

const MangaPanel = ({ panel, index, onImageUpload, onTextChange }) => {
  return (
    <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>Panel {index + 1}</h3>
      <input type="file" accept="image/*" onChange={onImageUpload} />
      {panel.image && (
        <img src={panel.image} alt={`Panel ${index + 1}`} style={{ width: '150px', height: '150px', marginTop: '10px' }} />
      )}
      <input
        type="text"
        value={panel.text || ''}
        placeholder="Enter text here..."
        onChange={onTextChange}
        style={{ display: 'block', width: '100%', marginTop: '10px' }}
      />
    </div>
  );
};

export default MangaPanel;
