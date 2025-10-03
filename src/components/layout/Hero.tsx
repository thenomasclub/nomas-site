import React from "react";
import Link from "next/link";
import styles from "@/src/styles/scss/modules/components/Hero.module.scss";
import { SquareArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaHref, backgroundImage, className }) => {
  return (
    <section className={`${styles.hero} ${className || ""}`}>
      
      {/* Content */}
      <div className={styles.contentWrap}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={`${styles.subtitle} h1`}>{subtitle}</p>}
          {ctaText && ctaHref && (
            <Link href={ctaHref} className={styles.ctaButton}>
              {ctaText}
              <SquareArrowRight size={25} strokeWidth={3} />
            </Link>
          )}
        </div>    
      </div>

      {/* Hero Overlay */}
      <div className={styles.overlay}></div>

      {/* Background Images */}
      <div className={styles.background} style={{ backgroundImage: `url(${backgroundImage})` }}></div>

    </section>
  );
};

export default Hero;
