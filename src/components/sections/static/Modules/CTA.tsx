"use client"

import React from "react";
import { motion } from "motion/react"
import styles from "@/src/styles/scss/pages/static/CTA.module.scss";
import EmailCapture from "@/src/components/form/EmailCapture";

const CTA: React.FC = () => {
    return (
        <div className={styles.cta}>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <motion.h2
                    className={styles.heading}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Stay up to date
                    </motion.h2>
                    <motion.p
                        className={styles.subheading}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Things are moving fast here, subscribe to our newsletter and follow us on socials to keep up to date with what&apos;s going on inside our community.
                    </motion.p>
                    <motion.div
                        className={styles.caption}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <EmailCapture />
                    </motion.div>
                </div>
                <div className={styles.col}>
                </div>
            </div>
        </div>
    );
}
export default CTA;