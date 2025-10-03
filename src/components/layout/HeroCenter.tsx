import React from "react";
import styles from "@/src/styles/scss/modules/components/HeroCenter.module.scss";

interface HeroProps {
  pre: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const HeroCenter: React.FC<HeroProps> = ({ pre, title, subtitle, className }) => {
  return (
    <section className={`${styles.hero} ${className || ""}`}>
      
      {/* Content */}
      <div className={styles.contentWrap}>
        <div className={styles.text}>
          <div className={`${styles.pre} pre`}>{pre}</div>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>    
      </div>

    </section>
  );
};

export default HeroCenter;
