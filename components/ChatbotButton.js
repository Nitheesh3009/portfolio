"use client";
import { useState } from "react";
import styles from "./ChatbotButton.module.css";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.popup} role="dialog" aria-label="Chatbot status">
          <div className={styles.popupHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.avatarDot} />
              <span className={styles.headerTitle}>AI Assistant</span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className={styles.popupBody}>
            <div className={styles.buildingIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M13 27v-8l7-5 7 5v8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="17" y="21" width="6" height="6" rx="1" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M10 27h20" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className={styles.statusText}>Chatbot build in progress</p>
            <p className={styles.statusSub}>
              An AI assistant is coming soon to answer questions about my experience and projects.
            </p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
            </div>
          </div>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI chatbot"
        title="AI Assistant"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 5l12 12M17 5L5 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.18 4.94 3.08 6.6L4 22l4.65-1.54C9.97 20.79 10.97 21 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2z" fill="white" fillOpacity="0.9" />
            <circle cx="8.5" cy="11" r="1" fill="var(--bg-primary)" />
            <circle cx="12" cy="11" r="1" fill="var(--bg-primary)" />
            <circle cx="15.5" cy="11" r="1" fill="var(--bg-primary)" />
          </svg>
        )}
        <span className={styles.badge}>AI</span>
      </button>
    </div>
  );
}
