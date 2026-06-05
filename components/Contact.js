"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <span className="section-label">Get In Touch</span>
          <h2 className={styles.title}>Let&apos;s Build Something Together</h2>
          <p className={styles.desc}>
            Open to senior Cloud/DevOps Engineer roles and infrastructure consulting. If you&apos;re
            looking for someone who can design, automate, and own your cloud systems — let&apos;s talk.
          </p>

          <div className={styles.links}>
            <a href="mailto:nitheeshreddye@gmail.com" className={styles.link}>
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              nitheeshreddye@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/nitheesh-edla-b01644118"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 8.5v5M6 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 13.5v-3a2 2 0 014 0v3M10 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              LinkedIn Profile
            </a>
            <div className={styles.phoneSlot}>
              <button
                className={styles.link}
                onClick={() => setPhoneRevealed(true)}
                style={{ opacity: phoneRevealed ? 0 : 1, pointerEvents: phoneRevealed ? "none" : "auto" }}
                aria-hidden={phoneRevealed}
              >
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 4h3l1.5 3.5-1.5 1a9 9 0 004.5 4.5l1-1.5L16 13v3a1 1 0 01-1 1A13 13 0 013 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Show Phone Number
              </button>
              <a
                href="tel:9407582747"
                className={styles.link}
                style={{ opacity: phoneRevealed ? 1 : 0, pointerEvents: phoneRevealed ? "auto" : "none" }}
                aria-hidden={!phoneRevealed}
              >
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 4h3l1.5 3.5-1.5 1a9 9 0 004.5 4.5l1-1.5L16 13v3a1 1 0 01-1 1A13 13 0 013 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                (940) 758-2747
              </a>
            </div>
          </div>

          <div className={styles.location}>
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
              <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="var(--text-muted)" strokeWidth="1.5" />
              <circle cx="10" cy="8" r="2" stroke="var(--text-muted)" strokeWidth="1.5" />
            </svg>
            Dallas, Texas
          </div>
          <div className={styles.locationBadges}>
            <span className={styles.badge}>Onsite</span>
            <span className={styles.badge}>Hybrid</span>
            <span className={styles.badge}>Open to Relocation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
