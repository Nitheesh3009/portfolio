"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoAccent}>NE</span>
          <span className={styles.logoText}>Nitheesh Edla</span>
        </a>

        <nav className={`${styles.links} ${open ? styles.open : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="/Nitheesh_Edla_Resume.pdf"
            download
            className={styles.resumeBtn}
            onClick={() => setOpen(false)}
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className={styles.hireBtn}
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={open ? styles.burgerLineTop : ""} />
          <span className={open ? styles.burgerLineMid : ""} />
          <span className={open ? styles.burgerLineBot : ""} />
        </button>
      </div>
    </header>
  );
}
