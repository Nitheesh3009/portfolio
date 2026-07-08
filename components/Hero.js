"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import TerminalBlock from "./TerminalBlock";
import YamlResume from "./YamlResume";

function useCountUp(target, duration = 1400) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    const decimals = target.includes(".") ? target.split(".")[1].replace(/[^0-9]/g, "").length : 0;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = (eased * numeric).toFixed(decimals);
          setDisplay(val + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { display, ref };
}

function AnimatedStat({ value, label }) {
  const { display, ref } = useCountUp(value);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statValue}>{display}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

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
  { value: "99.8%", label: "Uptime SLO Met" },
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
        <div className={styles.twoCol}>
          <div className={styles.left}>
            <div className={styles.badgeRow}>
              <span className={styles.openToWork}>
                <span className={styles.otwDot} />
                Open to Work
              </span>
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
              Hi, I&apos;m <strong>Nitheesh Edla</strong>. A Cloud, DevOps &amp; SRE
              Engineer with 7+ years of experience designing secure, multi-cloud
              (AWS, Azure, GCP) architectures, automating delivery pipelines, and
              building self-service platforms that improve developer velocity and reliability.
            </p>

            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/nitheesh-edla-b01644118"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 8.5v5M6 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 13.5v-3a2 2 0 014 0v3M10 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/Nitheesh3009"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor" />
                </svg>
                GitHub
              </a>
            </div>

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

            <YamlResume />
          </div>

          <div className={styles.right}>
            <TerminalBlock />
          </div>
        </div>

        <div className={styles.statsRow}>
          {stats.map((s) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
