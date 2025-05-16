import React from "react";
import styles from "./AboutUs.module.scss";
import leftImage from "../../../assests/aboutus.jpeg";

const AboutUs = () => {
    return (
        <div className={styles.AboutUs} id="AboutUs">
            <div
                className={`d-flex justify-content-center ${styles.centerContent}`}
            >
                <div className={` ${styles.left}`}>
                    <img src={leftImage} alt='aboutUs' className={styles.img} />
                </div>
                <div className={`${styles.right}`}>
                    <div className={styles.subheading}>Quick Start to Website Localization</div>
                    <div className={styles.content}>
                        Get your website translated in just a few simple steps. No manual work—just connect, run the
                        script, and go live in multiple languages.
                        <ul style={{listStyle: 'disc', marginLeft: '20px'}}>
                            <li>Register and log in to the back office</li>
                            <li>Add your target languages and set default language</li>
                            <li>Provide repository details, github, bitbucket, gitlab, shopify, wix etc.</li>
                            <li>Run the translations button</li>
                            <li>Your website is instantly translated and ready to use</li>
                        </ul>

                    </div>
                    <div className={styles.learnMore}>Learn More</div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
