import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";

import "swiper/css";
import "swiper/css/pagination";

import "./reels.css";
import { useAllReelsQuery, useLikeReelMutation } from "../redux/api/api";
import { IoHeartOutline } from "react-icons/io5";
import { FaComments } from "react-icons/fa6";
import { BiMessageRounded, BiSend } from "react-icons/bi";
import ReelLoader from "../Components/ReelLoader";
import { useSelector } from "react-redux";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toast } from "react-toastify";
import Reel from "../Components/Reel";
import axios from "axios";
import { shuffleArray } from "../Components/RenderAttachment";
import Loader from "../Components/Loader";
import { useViewReel } from "../Requests/PostRequests";
import { useLocation } from "react-router-dom";
const Reels = () => {
  const { user } = useSelector((state) => state.auth);
  const swiperRef = useRef(null);
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRefs = useRef([]);
  const { data, isLoading, isError } = useAllReelsQuery();
  const reels = data?.reels;

  const viewPlus = useViewReel()

  const handleSlideChange = (newIndex) => {
    // Pause the previously playing video when the slide changes
    if (playerRefs.current[currentIndex]) {
      playerRefs.current[currentIndex].getInternalPlayer()?.pause();
    }
    const currentReelId = reels[currentIndex]?._id
    // Update the currentIndex to the new index
    setCurrentIndex(newIndex);
    viewPlus(currentReelId)
  };

  const handleVideoClick = (index) => {
    const player = playerRefs.current[index].getInternalPlayer();
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reelId = queryParams.get('reel');
    if (reelId) {
      const reelIndex = reels?.findIndex(reel => reel?._id === reelId);
      if (reelIndex !== -1 && swiperRef.current) {
        swiperRef.current.swiper.slideTo(reelIndex);
      }
    }
  }, [location, reels]);

  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="w-full h-full lg:p-10 md:p-10">
        <div className="w-full h-full lg:rounded-2xl md:rounded-2xl bg-white shadow-sm flex justify-center">
          <div className="h-full lg:w-[30rem] md:w-[30rem] w-full lg:pb-0 md:pb-0">
            <Swiper
              direction={"vertical"}
              className="mySwiper"
              slidesPerView={1}
              onSlideChange={({ realIndex }) => handleSlideChange(realIndex)}
              ref={swiperRef}
            >
              {reels?.map((reel, index) => {
                // setIsLiked(reel.likes.includes(user._id));
                return (
                  <SwiperSlide id={`reel-${reel.id}`} key={index + 1}>
                    <Reel
                      reel={reel}
                      index={index}
                      playerRefs={playerRefs}
                      currentIndex={currentIndex}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reels;
