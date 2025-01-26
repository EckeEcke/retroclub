import React, { useState, useEffect } from 'react';
import '../css/ImageGallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImageGallery = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
  }, [images])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="image-gallery">
        <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon="fa-solid fa-close" />    
        </button>
      <div className="image-container">
        <img src={images[currentIndex]?.original} alt='' />
      </div>
      <button className="prev-button" onClick={prevImage}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
      </button>
      <button className="next-button" onClick={nextImage}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
  )
}

export default ImageGallery;
