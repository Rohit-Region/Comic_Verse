import React, { useState } from 'react';
import MangaCreation from './MangaCreation';
import BookView from './BookView';

function MangaMain() {
  const [mangaPages, setMangaPages] = useState([]);

  const handlePageSave = (newPage) => {
    setMangaPages([...mangaPages, newPage]); // Add new page to the array
  };

  return (
    <div>
      <h1>Create and View Your Manga</h1>

      <MangaCreation onSavePage={handlePageSave} />

      {mangaPages.length > 0 && (
        <div style={{ marginTop: '50px' }}>
          <h2>View Manga</h2>
          <BookView pages={mangaPages} />
        </div>
      )}
    </div>
  );
}

export default MangaMain;
