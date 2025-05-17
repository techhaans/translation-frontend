import React from "react";
import styles from "./AboutUs.module.scss";
import productImg1 from "../../assests/product1.png";
import productImg2 from "../../assests/product2.png";

const AboutUs = () => {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Empowering Ideas through Technology</h1>
                    <p>
                        We are Techhaans — innovators, engineers, and problem solvers building smart software for a better tomorrow.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <h2>Who We Are</h2>
                        <p>
                            Techhaans Private Limited is a technology company focused on cutting-edge product development and tailored software consulting. We help startups and enterprises launch impactful digital experiences.
                        </p>
                    </div>
                    <img src={productImg1} alt="Our Team" className={styles.image} />
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <div className={styles.content}>
                    <img src={productImg2} alt="Our Product" className={styles.image} />
                    <div className={styles.text}>
                        <h2>Our Product</h2>
                        <p>
                            <strong>Haans Translations</strong> is a powerful platform for seamless language translation. Designed for scale, it helps you break barriers and localize content effortlessly.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.cta}>
                    <h2>Join Our Team</h2>
                    <p>
                        Passionate about tech? We’re always looking for skilled professionals to join our journey. Help shape the future of software innovation.
                    </p>
                    <a href="/careers" className={styles.button}>Explore Careers</a>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
