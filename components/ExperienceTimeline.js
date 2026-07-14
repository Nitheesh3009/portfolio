import styles from "./ExperienceTimeline.module.css";

const experience = [
  {
    role: "Cloud Engineer",
    company: "CNET Global Solutions",
    period: "Oct 2023 – Present",
    location: "Richardson, Texas",
    highlights: [
      "Designed and deployed AWS, GCP, and Azure infrastructure with Terraform; cut provisioning time ~50% and improved deploy frequency (DORA: daily deployments across 3 clouds).",
      "Defined SLOs and error budgets for 5 production services; maintained 99.8% availability SLO with Prometheus/Grafana SLI dashboards and AlertManager policies.",
      "Scaled Kubernetes on AKS, GKE, EKS using Helm; built full observability stack (Prometheus, Grafana, Loki) enabling p99 latency tracking and proactive toil reduction.",
      "Led Banregio banking migration (AWS → Azure) with zero data loss and financial compliance; achieved MTTR < 15 min via runbooks and on-call rotation.",
      "Secured container images via Qualys QScanner, reducing critical CVEs by 90%; enforced shift-left security in CI/CD golden paths.",
    ],
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "ArgoCD", "SLO/SLI", "Python"],
  },
  {
    role: "DevOps Engineer (Senior Analyst)",
    company: "Capgemini Technology Services",
    period: "Jun 2019 – Jul 2021",
    location: "Bangalore, India",
    highlights: [
      "Built Jenkins/Docker CI/CD pipelines across 12 development teams, reducing onboarding from weeks to days.",
      "Refactored monolithic application into containerized services, improving deployment speed by 40%.",
      "Managed AWS (EC2, S3, IAM, VPC) multi-AZ infrastructure maintaining 99.9% uptime for 5+ production apps.",
      "Deployed EKS workloads using Helm charts achieving zero-downtime releases.",
      "Automated EBS snapshots, S3 dashboards, and idle EC2 shutdowns saving 20+ hours/month.",
    ],
    tags: ["AWS", "Jenkins", "Docker", "Terraform", "Ansible", "EKS", "Python"],
  },
  {
    role: "Junior Software Engineer",
    company: "CBIZSOFT India Private Limited",
    period: "Oct 2017 – May 2019",
    location: "Hyderabad, India",
    highlights: [
      "Developed Python automation tools and CLI utilities (Flask, argparse) with pytest, reducing manual effort 30%.",
      "Built Jenkins + Git CI/CD pipelines for automated build-test-deploy workflows.",
      "Containerized applications with Docker; managed Ubuntu/CentOS servers.",
      "Automated operational tasks via Python/Bash cron scripts, saving 15+ hours/week.",
      "Configured AWS (EC2, S3, IAM) with CloudFormation and GitHub Actions.",
    ],
    tags: ["Python", "Docker", "Jenkins", "Git", "AWS", "Bash", "Linux"],
  },
];

const certifications = [
  {
    name: "Certified Kubernetes Administrator",
    abbr: "CKA",
    color: "#326CE5",
    verify: "https://www.credly.com/org/the-linux-foundation/badge/certified-kubernetes-administrator",
  },
  {
    name: "AWS Solutions Architect – Associate",
    abbr: "SAA-C03",
    color: "#FF9900",
    verify: "https://www.credly.com/badges/8df4bfb7-1d25-4b7d-9391-0293ca76237c/linked_in_profile",
  },
  {
    name: "AZ-400: DevOps Engineer Expert",
    abbr: "AZ-400",
    color: "#0078D4",
    verify: "https://www.credly.com/org/microsoft-certification/badge/microsoft-certified-devops-engineer-expert",
  },
  {
    name: "AZ-104: Azure Administrator",
    abbr: "AZ-104",
    color: "#0078D4",
    verify: "https://www.credly.com/org/microsoft-certification/badge/microsoft-certified-azure-administrator-associate",
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <span className="section-label">Career Trajectory</span>
        <h2 className="section-title">Experience &amp; Certifications</h2>
        <p className="section-desc">
          7+ years building and automating cloud infrastructure across global
          enterprises and financial institutions.
        </p>

        <div className={styles.layout}>
          <div className={styles.timeline}>
            {experience.map((job, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.dot} />
                <div className={styles.card}>
                  <div className={styles.meta}>
                    <span className={styles.period}>{job.period}</span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                  <h3 className={styles.role}>{job.role}</h3>
                  <p className={styles.company}>{job.company}</p>
                  <ul className={styles.highlights}>
                    {job.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                  <div className={styles.tags}>
                    {job.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.aside}>
            <div className={styles.certsCard}>
              <h3 className={styles.certsTitle}>Certifications</h3>
              <div className={styles.certsList}>
                {certifications.map((c) => (
                  <a
                    key={c.abbr}
                    href={c.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cert}
                    title={`Verify ${c.name} on Credly`}
                  >
                    <div className={styles.certBadge} style={{ background: `${c.color}20`, borderColor: `${c.color}40` }}>
                      <span style={{ color: c.color }}>{c.abbr}</span>
                    </div>
                    <div className={styles.certInfo}>
                      <span className={styles.certName}>{c.name}</span>
                      <span className={styles.certVerify}>Verify on Credly ↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.eduCard}>
              <h3 className={styles.certsTitle}>Education</h3>
              <div className={styles.edu}>
                <span className={styles.degree}>M.S. Computer Science</span>
                <span className={styles.school}>University of North Texas</span>
                <span className={styles.eduYear}>2021 – 2023 · Denton, TX</span>
              </div>
              <div className={styles.edu}>
                <span className={styles.degree}>B.Tech Computer Science</span>
                <span className={styles.school}>Lovely Professional University</span>
                <span className={styles.eduYear}>2013 – 2017 · Punjab, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
