import React, { useState } from "react";
import "./IndustryWeServe.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";

import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";

import IndustryWeServe_Img1 from "../../../assests/IndustryWeServe_Img1.png";
import IndustryWeServe_Img2 from "../../../assests/IndustryWeServe_Img2.png";
import IndustryWeServe_Img3 from "../../../assests/IndustryWeServe_Img3.png";
import IndustryWeServe_Img4 from "../../../assests/IndustryWeServe_Img4.png";
import IndustryWeServe_Img5 from "../../../assests/IndustryWeServe_Img5.png";

import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/pagination";

const IndustryWeServe = () => {
    const [swiperRef, setSwiperRef] = useState(null);

    const prevHandler = () => {
        swiperRef.slidePrev();
    };

    const nextHandler = () => {
        swiperRef.slideNext();
    };

    const sliderSettings = {
        576: {
            slidesPerView: 3,
            spaceBetween: 10,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 30,
            centeredSlides: false,
        },
    };

    return (
        <div className='IndustryWeServe'>
            <div className='centerContent'>
                <div className='heading'>Product Features</div>
                <div className='content'>
                    <span>👉  AI-powered translation with zero coding
                    Let your team translate content effortlessly — no developer time needed.</span>

                    <br/>
                    👉 Fast, reliable, and low-cost
                    Optimize your localization pipeline without breaking the bank.
                    <br/>
                    👉 Supports multiple languages at scale
                    Grow globally with built-in support for all your target markets.
                    <br/>
                    👉 Seamless setup with free onboarding
                    Get started in minutes — no complex integration required.
                    <br/>
                    👉 Flexible plans for startups to enterprises
                    Whether you're testing the waters or scaling fast, we’ve got you covered.
                </div>
                <Swiper
                    onSwiper={(swiper) => setSwiperRef(swiper)}
                    breakpoints={sliderSettings}
                    slidesPerView={"2"}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    loopedSlides={5}
                    mousewheel={false}
                    freeMode={true}
                    modules={[Mousewheel]}
                    className='mySwiper'
                >
                    {[
                        { img: IndustryWeServe_Img1, name: "GitHub, GitLab, Bitbucket Integration" },
                        { img: IndustryWeServe_Img2, name: "Shopify, Wix, WooCommerce & More" },
                        { img: IndustryWeServe_Img3, name: "iOS, Android, Web — Any Tech Stack" },
                        { img: IndustryWeServe_Img4, name: "No-Code Setup" },
                        { img: IndustryWeServe_Img5, name: "Real-Time Sync & Updates" },
                    ].map((curr, index) => (
                        <SwiperSlide key={index}>
                            <div className='row g-0 slide ms-1'>
                                <img src={curr.img} alt='' className='img' />
                                <div className='cardheading'>{curr.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className='navigations'>
                        <IoIosArrowDropleftCircle
                            size={40}
                            onClick={prevHandler}
                            className='icon'
                        />
                        <IoIosArrowDroprightCircle
                            size={40}
                            onClick={nextHandler}
                            className='icon'
                        />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default IndustryWeServe;
