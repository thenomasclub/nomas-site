import React from "react";
import pageMetadata from "./page.metadata";
import HeroCenter from "@/src/components/layout/HeroCenter";
import styles from "@/src/styles/scss/pages/membership/Membership.module.scss";
import MembershipDetails from "@/src/components/sections/membership/MembershipDetails";
import PricingTable from "@/src/components/layout/PricingTable";
import PartnerGrid from "@/src/components/partners/PartnerGrid";

export const metadata = pageMetadata

export default function Membership() {
  return (
    <>
      {/* HERO */}
        <HeroCenter 
        pre="Join our community"
        title="The Nomas Exclusive Experience"
        subtitle="This is your passport to a private network of entrepreneurs, founders, and professionals who are built to move differently. Join a global community focused on helping you grow meaningful connections through private events, build a lifestyle of freedom and purpose, and expand your network with people who inspire and grow alongside you."
        className={styles.hero}
        />

        {/* MEMBERSHIP DETAILS */}
        <section className={styles.details}>
          <div className="container">
            <MembershipDetails />
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
            <PartnerGrid />
        </section>

    </>
  );
}