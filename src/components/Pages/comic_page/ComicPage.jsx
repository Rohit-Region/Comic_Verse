import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComicDetails } from '../../../slice/booksSlice';
import { useParams } from 'react-router-dom';

const ComicPage = () => {
  const { comic_id } = useParams();
  const dispatch = useDispatch();
  const { bookData, image, pdf, loading, error } = useSelector((state) => state.books);
  const [view, setView] = useState(false);

  useEffect(() => {
    dispatch(fetchComicDetails(comic_id));
  }, [dispatch, comic_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookData) {
    return <div>No comic data available.</div>;
  }

  const PdfViewer = ({ pdfUrl }) => {
    return (
      <iframe
        src={`http://localhost:3002/uploads/${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        width="100%"
        height="100%"
        style={{backgroundColor:'white'}}
        title="PDF Viewer"
      ></iframe>
    );
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <button style={modalStyles.closeButton} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: '#fff',
      padding: '14px',
      // borderRadius: '8px',
      width: '65%',
      height: '80%',
      overflow: 'hidden',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '1px',
      right: '1px',
      border: 'none',
      borderRadius:'25px',
      background: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      backgroundColor:'#cfcfcf'
    },
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
        <div style={{ marginRight: '30px' }}>
          <img
            src={`http://localhost:3002/uploads/${image}`}
            alt={bookData.name}
            style={{ width: '200px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
          />
        </div>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 'bold' }}>{bookData.name}</p>
          <p style={{ margin: '0 0 10px', fontSize: '18px', color: '#555' }}>Rating: <strong>{bookData.rating}</strong></p>
          <p style={{ margin: '0 0 10px', fontSize: '18px', color: '#555' }}>Genre: <strong>{bookData.genre}</strong></p>
          <p style={{ margin: '0 0 10px', fontSize: '18px', color: '#555' }}>Episodes: <strong>{bookData.episodes}</strong></p>
          <p style={{ margin: '0 0 10px', fontSize: '18px', color: '#555' }}>Description: <strong>{bookData.description}</strong></p>
        </div>
      </div>

      <button onClick={() => setView(true)}>View</button>

      <Modal isOpen={view} onClose={() => setView(false)}>
        <PdfViewer pdfUrl={pdf} />
      </Modal>
    </div>
  );
};

export default ComicPage
;
