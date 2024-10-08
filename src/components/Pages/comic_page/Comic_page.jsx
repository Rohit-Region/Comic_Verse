import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { fetchComicDetails } from '../../../slice/booksSlice'

const ComicDetails = () => {
  const dispatch = useDispatch()
  const { bookData, image, pdf, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    console.log("MKI")
    dispatch(fetchComicDetails(8)); 
  }, [dispatch]);

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
    console.log(image)
    console.log(pdfUrl)
    return (
      <iframe
      src={`http://localhost:3002/uploads/${pdfUrl}`}
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="PDF Viewer"
      ></iframe>
    );
  };

  return (
    <div>
      <p style={{marginTop:"10px"}}>Comic :{bookData.name}</p>
      <p>Rating: {bookData.rating}</p>
      <p>Genre: {bookData.genre}</p>
      <img
        src={`http://localhost:3002/uploads/${image}`}
        alt={bookData.name}
        width="200"
      />
 <PdfViewer pdfUrl={pdf} />
    </div>
  );
};

export default ComicDetails;
