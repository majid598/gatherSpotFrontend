import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import "./styles.css";

// import required modules
import { FaSearch } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { EffectCreative } from "swiper/modules";

const LandPage = () => {
  return (
    <div className="w-full h-screen bg-zinc-100 relative flex overflow-hidden">
      <div className="w-full h-[100vw] -top-40 -right-[45%] rounded-full bg-sky-500 absolute"></div>
      <div className="w-2/5 h-full flex flex-col px-20 pt-32">
        <div className="w-20 h-20 rounded-full bg-zinc-200 overflow-hidden">
          <img src="/assets/logo.png" className="w-full h-full" alt="" />
        </div>
        <h1 className="uppercase mt-5 text-7xl font-bold">
          Gather<span className="text-sky-500">Spot</span>
        </h1>
        <p className="text-xl font-semibold relative z-50 mt-5">
          <span className="text-sky-500 ">Discover</span>, Connect, and Share
          Your Stories with GatherSpot – Where Every Voice Matters!
        </p>
      </div>
      <div className="w-3/5 h-full flex gap-16 lg-justify-end pr-10 items-center">
        <div className="w-[22rem] mobile bg-white overflow-hidden h-4/6 whitespace-nowrap rounded-2xl shadow-sm relative">
          <div className="w-full h-4/6 bg--300">
            <Swiper
              grabCursor={true}
              effect={"creative"}
              pagination={{ clickable: true }}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }}
              modules={[EffectCreative]}
              className="mySwiper"
            >
              <SwiperSlide className="bg--500 flex flex-col justify-start">
                <img
                  src="/assets/gather.webp"
                  className="w-full h-full rounded-bl-full"
                  alt=""
                />
                <h2 className="text-black poppins-regular mt-5 text-3xl w-full text-center">
                  Let&apos;s connect <br /> with each ohter.
                </h2>
                <p className="text-black poppins-regular text-sm leading-2">
                  Lorem ipsum dolor sit amet consectetur
                  <br /> adipisicing elit.
                </p>
              </SwiperSlide>
              <SwiperSlide className="flex-col">
                <img
                  src="/assets/withdraw.jpg"
                  className="w-full h-full rounded-bl-full"
                  alt=""
                />
                <h2 className="text-black poppins-regular mt-5 text-3xl w-full text-center">
                  Easy withdraw on <br /> your choice.
                </h2>
                <p className="text-black poppins-regular text-sm leading-2">
                  Easypaisa, Jazzcash, Sadapay, Nayapay,
                  <br /> Rasst, Bank.
                </p>
              </SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
          </div>
          <div className="w-full h-2/6 px-5">
            <div className="w-full h-2/5 flex items-center justify-center gap-1">
                <div className="w-8 h-3 rounded-full bg-black"></div>
                <div className="w-3 h-3 rounded-full bg-black"></div>
                <div className="w-3 h-3 rounded-full bg-black"></div>
            </div>
            <Link to={"/signup"} className="w-full text-center inline-block mt-6 p-4 rounded-lg bg-sky-500 text-white font-bold">
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-[22rem] mobile h-4/6 bg-white rounded-2xl shadow-sm relative overflow-hidden">
          <div className="w-full h-full absolute left-0 top-0 z-50"></div>
          <div className="header w-full h-[5rem] flex border-b items-center justify-between px-4">
            <div className="bg-sky-500 text-white p-2 rounded-md">
              <IoArrowBackOutline className="text-xl" />
            </div>
            <h2 className="text-xl font-semibold">My Credits</h2>
            <div className="flex items-center gap-3">
              <GoHeart className="text-2xl" />
              <FaSearch className="text-xl" />
            </div>
          </div>
          <div className="w-full p-10 lg-pt-5 flex flex-col gap-5 lg-gap-3">
            <div>
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                <img
                  src="/assets/profile.avif"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <h2 className="w-full text-center font-semibold mt-2">
                john doe
              </h2>
            </div>
            <div className="w-full min-h-20 shadow-sm flex flex-col gap-1 py-4 lg-p-3 items-center justify-center rounded-2xl">
              <h2 className="font-semibold">Credits</h2>
              <span className="font-bold">67</span>
            </div>
            <div className="w-full min-h-20 shadow-sm flex flex-col gap-1 py-4 lg-p-3 items-center justify-center rounded-2xl">
              <h2 className="font-semibold">Exchange</h2>
              <span className="font-bold">67C = {67 * 1} PKR</span>
            </div>
            <div className="w-full min-h-20 shadow-sm flex flex-col gap-1 py-4 lg-p-3 items-center justify-center rounded-2xl">
              <span className="font-semibold">
                {" "}
                <img
                  src="/assets/easy.png"
                  width={80}
                  className="mx-auto"
                  alt=""
                />{" "}
                {67 * 1} PKR
              </span>
              <button className="w-4/5 p-2 text-white bg-sky-500 rounded-lg font-bold">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[24rem] absolute -bottom-40 -left-40 h-[24rem] rounded-full bg-sky-500"></div>
    </div>
  );
};

export default LandPage;
