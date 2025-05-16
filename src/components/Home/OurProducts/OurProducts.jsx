import React, { useState } from "react";
import "./OurProducts.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import productImg1 from "../../../assests/product1.png";
import productImg2 from "../../../assests/product2.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/pagination";

const OurProducts = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    const navigate = useNavigate();

    const sliderSettings = {
        576: {
            slidesPerView: 1.5,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 1.5,
            spaceBetween: 30,
        },
        1441: {
            slidesPerView: 1.5,
            spaceBetween: 30,
        },
    };

    SwiperCore.use([Mousewheel, Pagination]);

    return (
        <div className='OurProducts'>
            <div className='centerContent d-flex flex-column justify-content-center gap-3 gap-md-0'>
                <div className='heading'>Our Services</div>
                <div className='headingbar row g-0 d-flex justify-content-center justify-content-md-between align-items-center'>
                    <div className='col-md-6 headingcontent text-center text-md-start'>
                        From building scalable products to providing expert consulting, we help you go from idea to execution — fast, reliable, and tailored to your needs.
                    </div>
                    <div
                        className='col-md-6 viewBtn d-flex justify-content-center justify-content-md-end'
                        onClick={() => navigate("/Products")}
                    >
                        View All Services
                        <HiArrowNarrowRight size={20} />
                    </div>
                </div>
                <Swiper
                    onSwiper={(swiper) => setSwiperRef(swiper)}
                    slidesPerView={"1.5"}
                    breakpoints={sliderSettings}
                    spaceBetween={15}
                    loop={true}
                    loopedSlides={4}
                    mousewheel={true}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <div className='row g-0 slide ms-1'>
                            <div className='col-md-4 left d-flex justify-content-start justify-content-md-center'>
                                <img
                                    src={productImg1}
                                    alt=''
                                    className='img-fluid img'
                                />
                            </div>
                            <div className='col-md-7 right d-flex flex-column gap-2'>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='heading'>Translations</div>
                                    <div className='subheading'>
                                        Tech Haans Translations
                                    </div>
                                    <div className='content'>
                                        Techhaans Translations is an AI-powered solution for automatically translating labels, image text, and documentation — fast, accurate, and code-free.
                                        <br/>
                                        Build smarter with expert-led development and strategic consulting.

                                        From concept to code — we help you develop and scale with confidence.

                                        Custom software and expert consulting to accelerate your growth.


                                    </div>
                                </div>
                                <div className='leanmoreBtn'>Learn More</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='row g-0 slide ms-1'>
                            <div className='col-md-4 left d-flex justify-content-start justify-content-md-center'>
                                <img
                                    src={productImg2}
                                    alt=''
                                    className='img-fluid img'
                                />
                            </div>
                            <div className='col-md-7 right d-flex flex-column gap-2'>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='heading'>Software development & consulting</div>
                                    <div className='subheading'>
                                        Multi Utility Soap
                                    </div>
                                    <div className='content'>
                                        Tailored software solutions and expert guidance to bring your ideas to life — from MVPs to enterprise systems.
                                      
                                    </div>
                                </div>
                                <div className='leanmoreBtn'>Learn More</div>
                            </div>
                        </div>
                    </SwiperSlide>
    
                </Swiper>
            </div>
        </div>
    );
};

export default OurProducts;
