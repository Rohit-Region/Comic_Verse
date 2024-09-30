import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComicDetails = () => {
  const [comicData, setComicData] = useState(null);  // Holds the fetched data
  const [loading, setLoading] = useState(true);      // Controls the loading state
  const [error, setError] = useState(null);          // Holds any error messages
  const [image,setImage]=useState(null)
  const [pdf,setPdf]=useState(null)
  
  useEffect(() => {
    // Make API call to get comic details by ID
    axios
      .get('http://localhost:3002/api/comics/comics/1')  // Adjust URL as needed
      .then((response) => {
        console.log("Response data:", response.data); // Check the response in the console
        setComicData(response.data);                 // Store the response data in state
        setLoading(false); 
        setImage(response.data.image.filename)
        setPdf(response.data.pdf.filename)
        setPdf("http://localhost:3002/uploads/1727591357037-Rohit_Raj_Resume.pdf")      
      })
      .catch((error) => {
        console.error("Error fetching comic data:", error);  // Log the error
        setError("Failed to fetch comic data");              // Set the error message
        setLoading(false);      
                               // Stop the loading state
      });
  }, []);  // Empty dependency array ensures the effect runs once on component mount
  

  if (loading) {
    return <div>Loading...</div>;  // Show loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error if the request fails
  }


  const PdfViewer = ({ pdfUrl }) => {
    return (
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="PDF Viewer"
      ></iframe>
    );
  };

  // Render the comic details after data has been successfully fetched
  return (
    <div>
      <p style={{marginTop:"10px"}}>Comic :{comicData.name}</p>
      <p>Rating: {comicData.rating}</p>
      <p>Genre: {comicData.genre}</p>
      <img
        src={`http://localhost:3002/uploads/${image}`}
        alt={comicData.name}
        width="200"
      />
 <PdfViewer pdfUrl={pdf} />
    </div>
  );
};

export default ComicDetails;
