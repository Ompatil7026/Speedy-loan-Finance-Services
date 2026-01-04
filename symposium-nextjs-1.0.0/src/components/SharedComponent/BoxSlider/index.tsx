"use client"
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const BoxSlider = () => {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // screen width <= 1024px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // screen width <= 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,          
        },
      },
      {
        breakpoint: 480, // screen width <= 480px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings} className="text-center">
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">PL</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Personal Loan</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">BL</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Business Loan</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">HL</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Home Loan</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">LAP</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Loan Against Property</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">BT</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Balance Transfer</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">PF</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Project Funding</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">LAS</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Loan Against Shares</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">WL</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Working Capital</p>
        </div>
        <div className="bg-IcyBreeze dark:bg-darklight pt-5 pb-7 rounded-lg text-center group hover:bg-primary">
          <h5 className="text-gray-400 text-[34px] leading-[2.76rem] font-normal group-hover:text-white">WI</h5>
          <p className="text-xs font-medium text-gray-400 group-hover:text-white">Wealth & Investment</p>
        </div>
      </Slider>
    </>
  );
};

export default BoxSlider;
