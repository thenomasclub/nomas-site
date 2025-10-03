"use client";
import { useState } from "react";
import styles from "@/src/styles/scss/modules/components/Form.module.scss";
import { SquareArrowRight } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // <-- NEW

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(""); // clear error when user types

    // Show policy when email looks valid
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setShowPolicy(true);
    } else {
      setShowPolicy(false);
      setPolicyChecked(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If honeypot is filled, ignore submission
    if (honeypot) return;

    if (!policyChecked) {
      setError("Please accept the privacy policy."); // <-- show as error instead of alert
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const listId =
        process.env.NEXT_PUBLIC_KLAVIYO_NEWSLETTER_LIST_ID || "UPnRrs";

      const res = await fetch("/api/klaviyo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, listId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "email_capture_submit",
          email: email, 
        });
      }

      setSuccess(true);
      setEmail("");
      setShowPolicy(false);
      setPolicyChecked(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.emailCapture} onSubmit={handleSubmit}>
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Email Field & Chevron */}
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Leave your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" disabled={!policyChecked || loading}>
          {loading ? (
            <svg
              className={styles.spinner}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                strokeDasharray="31.4"
                strokeDashoffset="0"
              />
            </svg>
          ) : (
            <SquareArrowRight size={25} strokeWidth={3} />
          )}
        </button>
      </div>

      {/* Sliding Privacy Policy */}
      <div className={`${styles.policySlide} ${showPolicy ? styles.visible : ""}`}>
        <input
          type="checkbox"
          checked={policyChecked}
          onChange={(e) => setPolicyChecked(e.target.checked)}
        />
        <label>
          I agree to the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          .
        </label>
      </div>

      {/* Error & Success Messages */}
      {error && <p className={styles.errorMsg}>{error}</p>}
      {success && <p className={styles.successMsg}>Thanks! You&apos;re on the list.</p>}
    </form>
  );
}