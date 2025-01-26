import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../css/ImageGallery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImageGallery = ({ images, onClose }) => {
    const [availableImages, setAvailableImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStartX.current = event.touches[0].clientX
    }

    const handleTouchMove = (event) => {
      touchEndX.current = event.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (touchStartX.current - touchEndX.current > 50) {
        nextImage()
      }

      if (touchStartX.current - touchEndX.current < -50) {
        prevImage()
      }
    }

    const galleryElement = document.querySelector('.image-gallery')
    galleryElement.addEventListener('touchstart', handleTouchStart)
    galleryElement.addEventListener('touchmove', handleTouchMove)
    galleryElement.addEventListener('touchend', handleTouchEnd)

    return () => {
      galleryElement.removeEventListener('touchstart', handleTouchStart)
      galleryElement.removeEventListener('touchmove', handleTouchMove)
      galleryElement.removeEventListener('touchend', handleTouchEnd)
    }
  }, [nextImage, prevImage])

  useEffect(() => {
    const checkImageAvailability = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl, { method: 'HEAD' })
        return response.ok
      } catch (error) {
        return false
      }
    }

    const filterAvailableImages = async () => {
      const validImages = await Promise.all(
        images.map(async (image) => {
          const isAvailable = await checkImageAvailability(image.original)
          return isAvailable ? image : null
        })
      )
      setAvailableImages(validImages.filter(Boolean))
    }

    filterAvailableImages()
  }, [images])

  const handleError = () => {
    nextImage()
  }

  return (
    <div className="image-gallery">
        <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon="fa-solid fa-close" />    
        </button>
      <div className="image-container">
        <img src={availableImages[currentIndex]?.original} alt='' onError={handleError} />
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
