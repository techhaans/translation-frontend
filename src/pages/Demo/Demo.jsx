import React from 'react';
import styles from './Demo.module.scss';

const ProductDescription = () => {
    return (
        <div className={styles.container}>
            {/* Section 1: YouTube Video */}
            <div className={styles.videoSection}>
                <h2>See How TechHaahns Translations Works</h2>
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

        </div>
    );
};

export default ProductDescription;
