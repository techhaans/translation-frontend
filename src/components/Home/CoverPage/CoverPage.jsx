import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollDown from "../../ScrollDown/ScrollDown";
import styles from "./CoverPage.module.scss";
import coverimg from "../../../assests/HomeShowScreen.png";
import HomeShowScreen2 from "../../../assests/HomeShowScreen2.png";
import { motion, useCycle } from "framer-motion";

import bg1 from "../../../assests/CoverPage_Carsousel3.png";
import bg2 from "../../../assests/CoverPage_Carsousel1.png";
import bg3 from "../../../assests/CoverPage_Carsousel2.png";

const CoverPage = () => {
    const [currentSlide, cycleSlide] = useCycle(0, 1, 2);
    const [imgarr] = useState([bg1]);
    const navigate = useNavigate();

    return (
        <div className={styles.CoverPage}>
            <div
                className={styles.centerContent}
                style={{ backgroundImage: `url(${imgarr[currentSlide]})` }}
            >
                {currentSlide === 0 && (
                    <div>
                        <div className={styles.heading} style={{ color: "black" }}>
                            Making the world speak
                        </div>
                        <div className={styles.heading} style={{ color: "black" }}>
                            your language <span style={{ color: "white" }}>-Digitally</span>
                        </div>
                    </div>
                )}
                {currentSlide === 1 && (
                    <div>
                        <div className={styles.heading} style={{ color: "white" }}>
                            Top-notch Industrial
                        </div>
                        <div className={styles.heading} style={{ color: "white" }}>
                            cleaning solutions for factories.
                        </div>
                    </div>
                )}
                {currentSlide === 2 && (
                    <div>
                        <div className={styles.heading} style={{ color: "white" }}>
                            Top-notch cleaning solution
                        </div>
                        <div className={styles.heading} style={{ color: "white" }}>
                            for all your needs.
                        </div>
                    </div>
                )}
                <div>
                    <div className={styles.subheading}>
                        "Automate your translations and streamline team collaboration.
                    </div>
                    <div className={styles.subheading}>
                        Deliver seamless multilingual experiences at global scale."
                    </div>
                </div>

                <div className={`d-flex justify-content-center justify-content-sm-start  ${styles.btns}`}>
                    <motion.div
                        className={styles.btn}
                        whileHover={{ scale: 1.04, transition: { duration: 0.1 } }}
                        onClick={() => navigate("/demo")}
                    >
                        Explore Now
                    </motion.div>
                    <motion.div
                        className={styles.btn}
                        whileHover={{ scale: 1.04, transition: { duration: 0.1 } }}
                        onClick={() => navigate("/products")}
                    >
                        Learn More
                    </motion.div>
                </div>



                {currentSlide === 0 && (
                    <motion.img
                        src={coverimg}
                        alt=''
                        className={`img-fluid d-none d-lg-block ${styles.img}`}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                )}
            </div>

            <div className={`d-none d-md-none d-lg-block ${styles.bottom}`}>
                <ScrollDown />
            </div>
        </div>
    );
};

export default CoverPage;
