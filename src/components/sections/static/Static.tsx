import React from "react";
import styles from "@/src/styles/scss/pages/static/Static.module.scss";
import ScrollJourney from "./Modules/ScrollJourney";
import StatsBanner from "./Modules/StatsBanner";
import Community from "./Modules/Community";
import PricingTable from "@/src/components/layout/PricingTable";
import CTA from "./Modules/CTA";
import PartnerSlider from "@/src/components/partners/PartnerSlider";
import Hero from "../../layout/Hero";

// Launch date
const launchDate = new Date("2025-05-03T00:00:00Z"); 

// Weeks since launch
const now = new Date();
const diffMs = now.getTime() - launchDate.getTime();
const weeksSinceLaunch = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

export default function Static() {
    
    return (
        <>
        {/* HERO */}
        <Hero  
        title="Welcome to The Nomas Club"
        subtitle="We&apos;re a global community of ambitious, like-minded entrepreneurs who move differently."
        ctaText="Become a Member"
        ctaHref="/membership"
        backgroundImage="/images/hero-bg.jpg"
        className={styles.heroSection}
        />

        {/* INSPIRE */}
        <section className={styles.journey}>
            <ScrollJourney />
        </section>

        {/* PROOF */}
        <section className={styles.proof}>
            <div className="container">
                <Community />
                <StatsBanner
                stats={[
                    { value: 500, label: "Members" },
                    { value: 50, label: "Partners" },
                    { value: weeksSinceLaunch, label: "Run Clubs" },
                ]}
                title="The fastest growing community in Bali"
                subtitle="And this is only the beginning."
                duration={2000}
                />
            </div>
        </section>

        {/* MEMBERSHIP */}
        <section className={styles.membership}>
            <div className="container">
                <PricingTable />
            </div>
        </section>

        {/* PARTNERS */}
        <section className={styles.partners}>
            <PartnerSlider />
        </section>

        {/* CONNECT */}
        <section className={styles.connect}>
            <div className="container">
                <CTA />
            </div>
        </section>
        </>
    );
}