import React, { useState } from "react";
import styles from "./BeforeAfter.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import BeforeAfterSliderComponent from "../BeforeAfterSliderComponent/BeforeAfterSliderComponent";
import { HiArrowNarrowRight } from "react-icons/hi";

import before1 from "../../../assests/before1.png";
import after1 from "../../../assests/after1.png";

import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/pagination";

SwiperCore.use([Pagination]);

const BeforeAfter = () => {
    const [swiperRef, setSwiperRef] = useState(null);

    const nextHandler = () => {
        if (swiperRef) swiperRef.slideNext();
    };

    return (
        <div className={styles.beforeAfter}>
            <div className={styles.centerContent}>
                <div className={styles.content}>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={1}
                        centeredSlides
                        spaceBetween={30}
                        loop
                        loopedSlides={4}
                        allowTouchMove={false}
                        freeMode
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className={styles.mySwiper}
                    >
                        {[1, 2, 3, 4].map((_, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <div className={styles.left}>
                                            <div className={styles.leftHeading}>Before &amp; After</div>
                                            <div className={styles.leftsubHeading}>Kitchen Cleaning</div>
                                            <div className={styles.nextBtn} onClick={nextHandler}>
                                                Next <HiArrowNarrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className={styles.right}>
                                            <BeforeAfterSliderComponent img1={after1} img2={before1} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfter;
