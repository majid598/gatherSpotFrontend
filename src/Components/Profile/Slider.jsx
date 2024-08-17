import React, { useEffect, useRef } from 'react';

const UserProfileSlider = ({ posts, currentIndex, setCurrentIndex }) => {
    const videoRefs = useRef([]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < posts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        // Pause all videos
        videoRefs.current.forEach((video) => {
            if (video) video.pause();
        });

        // Play the current video if it's a video post
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            currentVideo.play();
        }
    }, [currentIndex]);

    return (
        <div className="slider-container">
            <button className="prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>
                &#8249; {/* Left arrow symbol */}
            </button>

            <div className="post-display">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className={`post ${index === currentIndex ? 'active' : 'inactive'}`}
                        style={{ display: index === currentIndex ? 'block' : 'none' }} // Only display the active post
                    >
                        {post?.type === 'Photo' ? (
                            <img src={post?.attachMent?.url} alt="" className='w-full h-full object-contain' />
                        ) : (
                            <video
                                ref={(el) => (videoRefs.current[index] = el)} // Assign the ref to the video element
                                src={post?.attachMent?.url}
                            />
                        )}
                    </div>
                ))}
            </div>

            <button className="next-btn" onClick={handleNext} disabled={currentIndex === posts.length - 1}>
                &#8250; {/* Right arrow symbol */}
            </button>
        </div>
    );
};

export default UserProfileSlider;
