import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index }) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.header}>
        <span className={styles.number}>0{index + 1}</span>
        <span className={styles.category}>{project.category}</span>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.concept}>{project.concept}</p>

      <ul className={styles.outcomes}>
        {project.outcomes.map((o, i) => (
          <li key={i} className={styles.outcome}>
            <svg className={styles.check} viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.2" />
              <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span dangerouslySetInnerHTML={{ __html: o }} />
          </li>
        ))}
      </ul>

      <div className={styles.techStack}>
        {project.tech.map((t) => (
          <span key={t} className={styles.tech}>{t}</span>
        ))}
      </div>
    </article>
  );
}
