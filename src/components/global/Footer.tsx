import Link from "next/link";
import Logo from "../assets/Logo";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import styles from "@/src/styles/scss/modules/global/Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo */}
                <Logo className={styles.logo}/>

                {/* Social Icons */}
                <div className={styles.social}>
                  <Link href="#"><FaTiktok size={25} /></Link>
                  <Link href="#"><FaInstagram size={25} /></Link>
                </div>

                <div className={styles.bottom}>
                  &copy; {new Date().getFullYear()} The Nomas Club. All rights reserved.
                </div>
            </div> 
    </footer>
    );
}