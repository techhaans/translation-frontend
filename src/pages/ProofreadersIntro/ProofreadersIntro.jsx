import React, { useState } from "react";
import styles from "./ProofreadersIntro.module.scss";
import proofreaderImage from "../../assests/proofreaders.jpg";

const Proofreaders = () => {
    const [labelCount, setLabelCount] = useState(1000);
    const [labelTimeSec, setLabelTimeSec] = useState(10);
    const [hourlyRate, setHourlyRate] = useState(15);

    const labelsPerHour = 3600 / labelTimeSec;
    const payPerLabel = hourlyRate / labelsPerHour;
    const totalEarnings = labelCount * payPerLabel;
    const dailyEarnings = 8 * hourlyRate;

    return (
        <div className={styles.proofreaderContainer}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Become a Proofreader</h1>
                    <p>
                        Join our global network of language proofreaders. Work remotely, earn money, and help improve multilingual content across products.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.content}>
                    <img src={proofreaderImage} alt="Proofreaders" className={styles.image} />
                    <div className={styles.text}>
                        <h2>What You'll Do</h2>
                        <ul>
                            <li>📝 Review and correct translations</li>
                            <li>🌐 Work in languages you speak fluently</li>
                            <li>💼 Track your tasks and payments</li>
                        </ul>
                        <p>
                            We’re looking for <strong>detail-oriented, language-proficient individuals</strong> to help
                            us verify and enhance translated labels across apps.
                        </p>
                        <p>
                            Get paid <strong>per label or word reviewed</strong>. Flexible hours. Work from anywhere.
                        </p>
                        <h2>
                            Interested?{" "}
                            <a href="/RegisterProofreaderForm" className={styles.link}>Register</a> or{" "}
                            <a href="/login" className={styles.link}>Login</a> to get started.
                        </h2>

                    </div>
                </div>
            </section>

            <section className={styles.earningsSection}>
                <h2>💵 Estimate Your Earnings</h2>
                <div className={styles.calculatorBox}>
                    <div className={styles.inputs}>
                        <div>
                            <label>Labels to verify:</label>
                            <input
                                type="number"
                                value={labelCount}
                                onChange={(e) => setLabelCount(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Time per label (sec):</label>
                            <input
                                type="number"
                                value={labelTimeSec}
                                onChange={(e) => setLabelTimeSec(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Hourly rate ($):</label>
                            <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className={styles.results}>
                        <p><strong>Pay per label:</strong> ${payPerLabel.toFixed(4)}</p>
                        <p><strong>Hourly earnings:</strong> ${hourlyRate.toFixed(2)}</p>
                        <p><strong>Daily earnings (8 hrs):</strong> ${dailyEarnings.toFixed(2)}</p>
                        <p><strong>Total for {labelCount} labels:</strong> ${totalEarnings.toFixed(2)}</p>
                    </div>
                </div>
            </section>

            <section className={styles.callout}>
                <h2>Flexible. Remote. Paid.</h2>
                <p>
                    Join a growing team of linguists and professionals helping shape better digital experiences through accurate translations.
                </p>
            </section>
        </div>
    );
};

export default Proofreaders;
