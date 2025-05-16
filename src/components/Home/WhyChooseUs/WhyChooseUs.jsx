import React from "react";
import styles from "./WhyChooseUs.module.scss";
import whychooseus1 from "../../../assests/whychooseus1.png";
import whychooseus2 from "../../../assests/whychooseus2.png";
import whychooseus3 from "../../../assests/whychooseus3.png";
import whychooseus4 from "../../../assests/whychooseus4.png";

const WhyChooseUs = () => {
    return (
        <div className={styles.WhyChooseUs}>
            <div className={styles.centerContent}>
                <div className={styles.heading}>Why Choose Us</div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.imgwrapper}>
                            <img
                                src={whychooseus1}
                                alt=''
                                height={100}
                                className={`img-fluid ${styles.img}`}
                            />
                        </div>
                        <div className={styles.content}>
                            Zero coding, Unique, Fast and effective products.
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgwrapper}>
                            <img
                                src={whychooseus3}
                                alt=''
                                height={100}
                                className={`img-fluid ${styles.img}`}
                            />
                        </div>
                        <div className={styles.content}>
                            Multi language support helping reduce Inventory Costs.
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgwrapper}>
                            <img
                                src={whychooseus1}
                                alt=''
                                height={100}
                                className={`img-fluid ${styles.img}`}
                            />
                        </div>
                        <div className={styles.content}>
                            Connect Github, Gitlab, Bitbucket, Wix, Shopify etc and translate with Zero coding.
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.imgwrapper}>
                            <img
                                src={whychooseus4}
                                alt=''
                                height={100}
                                className={`img-fluid ${styles.img}`}
                            />
                        </div>
                        <div className={styles.content}>
                            Handles any languages or framework with ease.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
