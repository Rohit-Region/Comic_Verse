import React, { useState } from 'react';

const MangaCreation = ({ onSavePage }) => {
  const [panels, setPanels] = useState([]);
  const [page, setPage] = useState(1);

  const handleImageUpload = (e, panelIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedPanels = [...panels];
      updatedPanels[panelIndex] = { ...updatedPanels[panelIndex], image: reader.result };
      setPanels(updatedPanels);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e, panelIndex) => {
    const updatedPanels = [...panels];
    updatedPanels[panelIndex] = { ...updatedPanels[panelIndex], text: e.target.value };
    setPanels(updatedPanels);
  };

  const addPanel = () => {
    setPanels([...panels, { image: '', text: '' }]);
  };

  const handleSavePage = () => {
    onSavePage(panels);  // Send current panels to the App component
    setPage(page + 1);
    setPanels([]);  // Clear panels for the next page
  };

  return (
    <div>
      <h2>Create Your Manga (Page {page})</h2>

      {panels.map((panel, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <label>Upload Panel Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
          />
          {panel.image && (
            <div>
              <img
                src={panel.image}
                alt={`Panel ${index + 1}`}
                style={{ width: '200px', height: '200px', border: '1px solid black', marginTop: '10px' }}
              />
            </div>
          )}
          
          <label>Add Text (e.g., Speech or Captions):</label>
          <input
            type="text"
            value={panel.text || ''}
            onChange={(e) => handleTextChange(e, index)}
            style={{ display: 'block', marginTop: '10px', width: '100%' }}
          />
        </div>
      ))}

      <button onClick={addPanel}>Add Panel</button>

      <button onClick={handleSavePage} style={{ marginLeft: '20px' }}>
        Save Page {page}
      </button>
    </div>
  );
};

export default MangaCreation;
