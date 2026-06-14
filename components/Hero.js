"use client";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const badges = [
  "7+ Years Exp",
  "CKA Certified",
  "AWS SAA-C03",
  "AZ-400 DevOps Expert",
  "AZ-104 Azure Admin",
];

const stats = [
  { value: "40%", label: "Faster Release Cadence" },
  { value: "90%", label: "CVE Reduction" },
  { value: "40%", label: "Compute Cost Savings" },
  { value: "99.8%", label: "Uptime Maintained" },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.1,
      });
    }

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.badgeRow}>
          {badges.map((b) => (
            <span key={b} className={styles.badge}>{b}</span>
          ))}
        </div>

        <h1 className={styles.headline}>
          Automating Scale,{" "}
          <span className={styles.accent}>Securing Workloads,</span>
          <br />
          Optimizing Cloud Systems.
        </h1>

        <p className={styles.sub}>
          Hi, I&apos;m <strong>Nitheesh Edla</strong>. A Cloud &amp; DevOps
          Engineer with 7+ years of experience designing secure, multi-cloud
          (AWS, Azure, GCP) architectures and automating delivery pipelines.
        </p>

        <div className={styles.ctas}>
          <a href="#contact" className={styles.ctaPrimary}>
            Hire Me
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1a3 3 0 1 1 0 6A3 3 0 0 1 8 1zM2 13c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#projects" className={styles.ctaSecondary}>
            Explore Infrastructure Projects
          </a>
          <a href="/Nitheesh_Edla_Resume.pdf" download className={styles.ctaSecondary}>
            Download Resume (PDF)
          </a>
        </div>

        <div className={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
