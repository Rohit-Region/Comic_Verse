import React from 'react';
import sam2 from './../../../assets/sam2.jpg';
import './Card.css'
const Card = () => {
  return (
    <div className="parent">
      <div className="child">
        <img src={sam2} alt="Sample" /> {/* Use <img> tag and add alt attribute for accessibility */}
      </div>
      <div>
        <h1>Name</h1>
        <h1>Rate</h1>
        
      </div>
    </div>
  );
};

export default Card;
