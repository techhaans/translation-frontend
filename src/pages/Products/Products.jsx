import React from 'react';
import styles from './Products.module.scss';
import architecturediagram from '../../assests/architecture-diagram.jpeg';

const ProductDescription = () => {
    return (
        <div className={styles.container}>
            {/* Section 1: Product Architecture */}
            <div className={styles.architectureSection}>
                <h2>End-to-End Translation Architecture</h2>
                <p className={styles.description}>
                    Whether you're a customer looking to translate your website or a proofreader verifying translations, TechHaans offers a streamlined and automated workflow to take your site global.
                </p>
                <img
                    src={architecturediagram}
                    alt="TechHaans Architecture Diagram"
                    className={styles.architectureImage}
                />

                <div className={styles.roleExplanation}>
                    <div>
                        <h3>For Customers</h3>
                        <ul>
                            <li>Connect your GitHub, GitLab, or CMS like Shopify/Wix</li>
                            <li>Automatically extract UI labels for translation</li>
                            <li>AI handles translation, or assign to proofreaders</li>
                            <li>Push changes back live to your website</li>
                        </ul>
                    </div>

                    <div>
                        <h3>For Proofreaders</h3>
                        <ul>
                            <li>Sign up and select supported languages</li>
                            <li>Get assigned tasks needing manual review</li>
                            <li>Verify or edit translations</li>
                            <li>Get paid per verified task</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section 2: Hero + Video */}
            <br/>
            <div className={styles.heroSection}>
                <h2>See How TechHaans Translations Works</h2>
                <p className={styles.subtext}>
                    TechHaans simplifies multilingual web updates. Connect your repo, auto-translate labels, assign tasks to proofreaders, and push live—all in one seamless workflow.
                </p>

                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/BoaHHUUPXyg"
                        title="TechHaahns Product Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
