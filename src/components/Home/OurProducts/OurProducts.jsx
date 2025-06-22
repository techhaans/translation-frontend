import React, { useMemo } from "react";
import "./OurProducts.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, FreeMode } from "swiper";
import productImg1 from "../../../assests/product1.png";
import productImg2 from "../../../assests/product2.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const slideData = [
    {
        img: productImg1,
        alt: "Translations",
        title: "Translations",
        subtitle: "Tech Haans Translations",
        content: `Techhaans Translations is an AI-powered solution for automatically translating labels, image text, and documentation — fast, accurate, and code-free.`,
        link: "/products",
    },
    {
        img: productImg2,
        alt: "Software Development & Consulting",
        title: "Software Development & Consulting",
        subtitle: "Multi Utility Soap",
        content: `Tailored software solutions and expert guidance to bring your ideas to life — from MVPs to enterprise systems.`,
        link: "/products",
    },
    // add more slides here!
];

const OurProducts = React.memo(() => {
    const breakpoints = useMemo(() => ({
        576:  { slidesPerView: 1.5, spaceBetween: 30 },
        768:  { slidesPerView: 1.5, spaceBetween: 30 },
        1441: { slidesPerView: 1.5, spaceBetween: 30 },
    }), []);

    const modules = useMemo(() => [Mousewheel, Pagination, FreeMode], []);

    return (
        <section className="OurProducts">
            <div className="centerContent d-flex flex-column justify-content-center gap-3 gap-md-0">
                <h2 className="heading">Our Services</h2>
                <div className="headingbar row g-0 d-flex align-items-center">
                    <p className="col-md-6 headingcontent text-center text-md-start">
                        From building scalable products to providing expert consulting, we help you go from idea to execution — fast, reliable, and tailored to your needs.
                    </p>
                    <Link to="/products" className="col-md-6 viewBtn d-flex justify-content-center justify-content-md-end">
                        View All Services <HiArrowNarrowRight size={20} />
                    </Link>
                </div>

                <Swiper
                    slidesPerView="1.5"
                    breakpoints={breakpoints}
                    spaceBetween={15}
                    loop
                    freeMode
                    mousewheel
                    pagination={{ clickable: true }}
                    modules={modules}
                    className="mySwiper"
                >
                    {slideData.map(({ img, alt, title, subtitle, content, link }, idx) => (
                        <SwiperSlide key={idx}>
                            <article className="row g-0 slide ms-1">
                                <figure className="col-md-4 left d-flex justify-content-start justify-content-md-center">
                                    <img src={img} alt={alt} loading="lazy" className="img-fluid img" />
                                </figure>
                                <div className="col-md-7 right d-flex flex-column gap-2">
                                    <div className="d-flex flex-column gap-2">
                                        <h3 className="heading">{title}</h3>
                                        <h4 className="subheading">{subtitle}</h4>
                                        <p className="content">{content}</p>
                                    </div>
                                    <Link to={link} className="leanmoreBtn">
                                        Learn More
                                    </Link>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
});

export default OurProducts;
