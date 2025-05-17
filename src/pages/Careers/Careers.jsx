import React from "react";
import styles from "./Careers.module.scss";
import teamImage from "../../assests/interns.jpg";

const Careers = () => {
    return (
        <div className={styles.careersContainer}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Launch Your Career with Us</h1>
                    <p>
                        We're building future tech leaders. Join our dynamic internship program and gain real-world experience in an innovative environment.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.content}>
                    <img src={teamImage} alt="Internship Team" className={styles.image} />
                    <div className={styles.text}>
                        <h2>Currently Recruiting Interns</h2>
                        <ul>
                            <li>💻 Java with Spring & Hibernate</li>
                            <li>⚛️ React.js Development</li>
                            <li>🧪 Software Testing</li>
                        </ul>
                        <p>
                            We're looking for <strong>serious, driven, and passionate individuals</strong> eager to
                            learn and grow with a hands-on experience. This internship runs for <strong>3 to 6 months
                            (unpaid)</strong> with real project exposure.
                        </p>
                        <p>
                            Based on your performance, we’ll have <strong>further discussions</strong> about extended
                            opportunities within our team.
                        </p>
                        <h2>Apply Now, Send you resume to info@techhaans.com</h2>
                    </div>
                </div>
            </section>

            <section className={styles.callout}>
                <h2>Build. Learn. Grow.</h2>
                <p>
                    This is your opportunity to learn from experienced professionals and work on real-world products that make a difference.
                </p>
            </section>
        </div>
    );
};

export default Careers;
