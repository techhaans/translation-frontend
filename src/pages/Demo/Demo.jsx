import React from 'react';
import styles from './Demo.module.scss';

const ProductDescription = () => {
    return (
        <div className={styles.container}>
            {/* Section 1: YouTube Video */}
            <div className={styles.videoSection}>
                <h2>Haans Translations Demo</h2>
                <div className={styles.videoWrapper}>
                    <iframe
                        src="https://www.youtube.com/embed/d1Uomgo4dAI"
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
