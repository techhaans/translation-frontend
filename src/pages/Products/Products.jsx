import React from 'react';
import styles from './Products.module.scss';

const ProductDescription = () => {
    return (
        <div className={styles.container}>
            {/* Section 1: YouTube Video */}
            <div className={styles.videoSection}>
                <h2>See How TechHaans Translations Works</h2>
                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/BoaHHUUPXyg"
                        title="TechHaahns Product Demo"
                        style={{
                            border: '4px solid gold',
                            borderRadius: '12px',
                            width: '100%',
                            height: '500px',
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                </div>
            </div>

            {/* Section 2: Product Flow Diagram */}
            <div className={styles.diagramSection}>
                <h2>Product Flow</h2>
                <img src="/path-to-diagram.png" alt="Product Flow Diagram" className={styles.diagram}/>
            </div>

            {/* Section 3: How It Works */}
            <div className={styles.howItWorks}>
                <h2>How It Works</h2>
                <ol>
                    <li>Connect your GitHub, GitLab, Bitbucket, or CMS (like Shopify, Wix, etc).</li>
                    <li>We automatically extract labels, images, and documentation for translation.</li>
                    <li>AI translates and updates content across platforms (web, iOS, Android, etc).</li>
                    <li>You review, publish, and go global with confidence.</li>
                </ol>
            </div>
        </div>
    );
};

export default ProductDescription;
