'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "../assets/Logo";
import styles from "@/src/styles/scss/modules/global/Header.module.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/">
          <Logo className={styles.logo}/>
        </Link>
    </div>
    </header>
  );
}
