import { motion } from "framer-motion";
import React from "react";
import FAQAccordion from "../FAQAccordion/FAQAccordion";
import styles from "./FAQ.module.scss";

const FAQ = () => {
    return (
        <div className={styles.FAQ}>
            <div className={styles.centerContent}>
                <div className={styles.heading}>FAQ's</div>

                {[
                    {
                        question: "1. How do I get started with website localization?",
                        answer: "Start by registering an account and logging into the back office. From there, select your target languages, set a default, download the integration script, and add it to your project. Once done, run the script to see your translated website live.",
                    },
                    {
                        question: "2. Do I need to manually translate my content?",
                        answer: "No manual work is needed. After setting up your repository or platform (e.g., GitHub, Bitbucket, Shopify), simply click the translate button and your site will automatically be translated.",
                    },
                    {
                        question: "3. What platforms are supported for integration?",
                        answer: "We support multiple platforms including GitHub, Bitbucket, GitLab, Shopify, Wix, and more. You just need to provide your repository details to get started.",
                    },
                    {
                        question: "4. What is included in the free plan?",
                        answer: "The free plan includes setup, translation of up to 1,000 labels, support for 3 languages, and is valid for 30 days. After that, you can choose to upgrade for extended features.",
                    },
                    {
                        question: "5. Can I upgrade later to a paid plan?",
                        answer: "Yes, once your free plan expires or if your label or language needs exceed the limit, you can upgrade to a Basic or Business plan directly from your dashboard."
                    },
                ].map((curr, index) => (
                    <motion.span
                        initial={{ x: 200, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        key={index}
                    >
                        <FAQAccordion
                            key={index}
                            question={curr.question}
                            answer={curr.answer}
                        />
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
