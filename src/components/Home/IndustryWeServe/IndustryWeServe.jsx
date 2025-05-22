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
                <div className="content">
                    <span className="description">🧠 AI-powered translation with zero coding — Let your team translate content effortlessly, no developer time needed.</span>
                    <br/>
                    <span className="description">⚡ Fast, reliable, and low-cost — Optimize your localization pipeline without breaking the bank.</span>
                    <br/>
                    <span className="description">🌍 Supports multiple languages at scale — Grow globally with built-in support for all your target markets.</span>
                    <br/>
                    <span className="description">🚀 Seamless setup with free onboarding — Get started in minutes, no complex integration required.</span>
                    <br/>
                    <span className="description">📈 Flexible plans for startups to enterprises — Whether you're testing the waters or scaling fast, we’ve got you covered.</span>
                </div>


            </div>
        </div>
    );
};

export default IndustryWeServe;
