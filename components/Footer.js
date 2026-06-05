import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.copy}>© 2025 Nitheesh Edla. Built with Next.js.</span>
        <div className={styles.links}>
          <a href="mailto:nitheeshreddye@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/nitheesh-edla-b01644118" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/Nitheesh_Edla_Resume.pdf" download>Resume</a>
        </div>
      </div>
    </footer>
  );
}
