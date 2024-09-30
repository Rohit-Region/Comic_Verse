import React from 'react';
import sam2 from './../../../assets/sam2.jpg';
import './Card.css'
import { useNavigate } from 'react-router-dom';


const Card = () => {
   
  const navigate = useNavigate()

  return (
    <div className="parent" onClick={()=>(navigate('./comic_page'))}>
      <div className="child">
        <img src={sam2} alt="Sample" /> {/* Use <img> tag and add alt attribute for accessibility */}
      </div>
      <div>
        Name
        Rate
      </div>
    </div>
  );
};

export default Card;
