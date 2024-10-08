import React, { useState, useEffect } from 'react';
import './Carousel.css'; // You can customize the styles here
import sam2 from './../../../assets/sam2.jpg';
import sam3 from './../../../assets/sam3.jpeg';
import sam4 from './../../../assets/sam4.jpg';
const Carousel = () => {
  // Array of images (or content) for the carousel
  const images = [
    sam2,
    sam3,
    sam4
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide

  // Change slides automatically every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  // Change to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Change to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      {/* Previous Button */}
      <button className="prev" onClick={prevSlide}>❮</button>

      {/* Image Slide */}
      <div className="carousel-slide">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>

      {/* Next Button */}
      <button className="next" onClick={nextSlide}>❯</button>

      {/* Dots to indicate the active slide */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
