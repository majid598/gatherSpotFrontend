
import React, { useEffect, useState } from 'react';
// import './VideoPage.css'; // Import CSS file for styling


const MySliderComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(true);

  // Sample slides data
  const slides = [
    { id: 1, imageUrl: "/assets/logo.png", caption: "Slide 1" },
    { id: 2, imageUrl: "/assets/easy.png", caption: "Slide 2" },
    { id: 3, imageUrl: "/assets/pfl.jpg", caption: "Slide 3" }
    // Add more slides as needed
  ];

  // Function to handle navigation to a specific slide

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoSlideEnabled(false); // Disable auto-slide when a dot is clicked
  };

  const goToNextSlide = () => {
    const nextSlideIndex = (activeSlide + 1) % slides.length;
    setActiveSlide(nextSlideIndex);
  };

  const goToPrevSlide = () => {
    const prevSlideIndex = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(prevSlideIndex);
  };

  useEffect(() => {
    let intervalId;

    if (isAutoSlideEnabled) {
      intervalId = setInterval(goToNextSlide, 4000); // Change slide every 4 seconds
    }

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [activeSlide, isAutoSlideEnabled]);

  return (
    <div className="slider-container">
      <div className="slides w-1/4 overflow-hidden" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.imageUrl} alt={slide.caption} />
            <p>{slide.caption}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={index === activeSlide ? "dot active" : "dot"}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Previous and Next buttons */}
      <button className="prev" onClick={goToPrevSlide}>&lt;</button>
      <button className="next" onClick={goToNextSlide}>&gt;</button>
    </div>
  );
};

export default MySliderComponent;

