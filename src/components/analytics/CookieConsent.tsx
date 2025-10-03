"use client";

import { useEffect } from "react";
import { motion } from "motion/react"
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function CookieConsentBanner() {
  useEffect(() => {
    // Check if the user already accepted marketing cookies
    const consent = Cookies.get("marketing_consent");
    if (consent === "true") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "marketing_consent_granted" });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="marketing_consent"
        expires={365}
        enableDeclineButton
        declineButtonText="Decline"
        onAccept={() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "marketing_consent_granted" });
        }}
        onDecline={() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "marketing_consent_declined" });
        }}
        style={{
            position: "fixed",
            inset: "auto 20px 20px auto",
            width: "320px",
            background: "#03030340",
            color: "#f3f3f3",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            flexWrap: "nowrap",
            alignItems: "flex-start",
            flexDirection: "column",
        }}
        buttonStyle={{
            color: "#030303",
            width: "270px",
            background: "#f3f3f3",
            fontSize: "14px",
            fontWeight: "bold",
            margin: "5px",
        }}
        declineButtonStyle={{
            color: "#fff",
            width: "270px",
            background: "#a9a9a9",
            fontSize: "14px",
            margin: "5px",
        }}
        contentStyle={{
            flex: "1 1 auto",
            fontSize: "14px",
            lineHeight: "1.4",
        }}
        >
        <style>
            {`
            @media (max-width: 768px) {
                .CookieConsent {
                width: 100% !important;
                right: 0 !important;
                bottom: 0 !important;
                border-radius: 0 !important;
                padding: 10px !important;
                padding-bottom: 50px !important;
                box-shadow: none !important;
                align-items: center !important;
                text-align: center;
                }
                .CookieConsent button {
                width: 100px !important;
                }
            }
            `}
        </style>
            We use cookies to improve your experience. By clicking &quot;Accept&quot; you agree to marketing cookies.
        </CookieConsent>
    </motion.div>
  );
}
