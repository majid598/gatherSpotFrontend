
// import React, { useEffect, useState } from 'react';
// // import './VideoPage.css'; // Import CSS file for styling


// const MySliderComponent = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(true);

//   // Sample slides data
//   const slides = [
//     { id: 1, imageUrl: "/assets/logo.png", caption: "Slide 1" },
//     { id: 2, imageUrl: "/assets/easy.png", caption: "Slide 2" },
//     { id: 3, imageUrl: "/assets/pfl.jpg", caption: "Slide 3" }
//     // Add more slides as needed
//   ];

//   // Function to handle navigation to a specific slide

//   const goToSlide = (index) => {
//     setActiveSlide(index);
//     setIsAutoSlideEnabled(false); // Disable auto-slide when a dot is clicked
//   };

//   const goToNextSlide = () => {
//     const nextSlideIndex = (activeSlide + 1) % slides.length;
//     setActiveSlide(nextSlideIndex);
//   };

//   const goToPrevSlide = () => {
//     const prevSlideIndex = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
//     setActiveSlide(prevSlideIndex);
//   };

//   useEffect(() => {
//     let intervalId;

//     if (isAutoSlideEnabled) {
//       intervalId = setInterval(goToNextSlide, 4000); // Change slide every 4 seconds
//     }

//     return () => clearInterval(intervalId); // Clean up interval on component unmount
//   }, [activeSlide, isAutoSlideEnabled]);

//   return (
//     <div className="slider-container">
//       <div className="slides w-1/4 overflow-hidden" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
//         {slides.map((slide) => (
//           <div key={slide.id} className="slide">
//             <img src={slide.imageUrl} alt={slide.caption} />
//             <p>{slide.caption}</p>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         {slides.map((slide, index) => (
//           <span
//             key={slide.id}
//             className={index === activeSlide ? "dot active" : "dot"}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>

//       {/* Previous and Next buttons */}
//       <button className="prev" onClick={goToPrevSlide}>&lt;</button>
//       <button className="next" onClick={goToNextSlide}>&gt;</button>
//     </div>
//   );
// };

// export default MySliderComponent;



import React, { useState, useEffect } from 'react';

const data = [{ bg: "red" }, { bg: "blue" }, { bg: "pink" }, { bg: "yellow" }]

const Test = () => {
  const [videos, setVideos] = useState([]);

  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  useEffect(() => {
    setVideos(shuffleArray(data));
  }, [videos]);
  return (
    <div className='w-full h-auto flex flex-col items-center py-20 gap-10'>
      {videos.map(video => (
        <div className={`w-40 h-40 flex items-center justify-center`} style={{ backgroundColor: video?.bg }}></div>
      ))}
    </div>
  );
};

export default Test
