import styles from "./SkillsGrid.module.css";

const categories = [
  {
    name: "DevOps & Containers",
    icon: "⚙️",
    skills: ["Docker", "Kubernetes", "Helm", "Kustomize", "ArgoCD", "Jenkins", "Azure DevOps"],
  },
  {
    name: "Cloud Platforms",
    icon: "☁️",
    skills: ["AWS", "Azure", "GCP", "OCI"],
  },
  {
    name: "Infrastructure as Code",
    icon: "🏗️",
    skills: ["Terraform", "Ansible", "Azure Bicep", "CloudFormation"],
  },
  {
    name: "CI/CD",
    icon: "🔄",
    skills: ["Jenkins", "GitHub Actions", "Azure Pipelines", "ArgoCD"],
  },
  {
    name: "Observability",
    icon: "📊",
    skills: ["Prometheus", "Grafana", "Loki", "AlertManager", "Datadog", "ELK Stack", "Azure Monitor", "Application Insights"],
  },
  {
    name: "Networking",
    icon: "🌐",
    skills: ["AWS ALB/NLB", "Azure Load Balancer", "VPC", "VNets", "NSGs", "Private Endpoints"],
  },
  {
    name: "Programming",
    icon: "💻",
    skills: ["Python", "Flask", "FastAPI", "Boto3", "Shell/Bash", "Go", "Java"],
  },
  {
    name: "SRE & Reliability",
    icon: "🔁",
    skills: ["SLO/SLI/Error Budgets", "Incident Management", "Blameless Postmortems", "Chaos Engineering", "PagerDuty", "MTTR Reduction", "Runbook Automation"],
  },
  {
    name: "Platform Engineering",
    icon: "🛠️",
    skills: ["Internal Developer Platforms", "Self-Service APIs", "Golden Path Templates", "DORA Metrics", "Developer Portals", "Policy as Code"],
  },
  {
    name: "Databases",
    icon: "🗄️",
    skills: ["MySQL", "MongoDB", "Amazon RDS", "DynamoDB", "Azure SQL", "Elasticsearch"],
  },
];

export default function SkillsGrid() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <span className="section-label">Technical Toolkit</span>
        <h2 className="section-title">Skills &amp; Technologies</h2>
        <p className="section-desc">
          A full-stack view of the tools and platforms I use to design,
          automate, and operate cloud infrastructure at scale.
        </p>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{cat.icon}</span>
                <h3 className={styles.catName}>{cat.name}</h3>
              </div>
              <div className={styles.pills}>
                {cat.skills.map((s) => (
                  <span key={s} className={styles.pill}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
