import React, { useState } from 'react';

const BookView = ({ pages }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };
 
  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div>
      <h2>Manga Book View</h2>
      
      <div style={{ 
        width: '500px', 
        height: '700px', 
        border: '1px solid black', 
        margin: 'auto', 
        position: 'relative' 
      }}>
        {/* Render current page's panels */}
        {pages[currentPageIndex].map((panel, index) => (
          <div key={index} style={{ padding: '10px', textAlign: 'center' }}>
            <img
              src={panel.image}
              alt={`Panel ${index + 1}`}
              style={{ width: '300px', height: '300px' }}
            />
            <p>{panel.text}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={currentPageIndex === 0}>
          Previous Page
        </button>
        <span style={{ margin: '0 20px' }}>Page {currentPageIndex + 1} of {pages.length}</span>
        <button onClick={handleNextPage} disabled={currentPageIndex === pages.length - 1}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default BookView;
