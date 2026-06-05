import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

const projects = [
  {
    category: "Multi-Cloud IaC",
    title: "Multi-Cloud Automated Infrastructure Platform",
    concept:
      "Automated provisioning and standardized CI/CD pipelines across AWS, Azure, and GCP for Matilda Cloud.",
    outcomes: [
      "Provisioned clusters, VNets, load balancers, and databases using <strong>Terraform & Ansible</strong>, cutting provisioning time by <strong>~50%</strong>.",
      "Accelerated release cadences by <strong>40%</strong> by designing CI/CD pipelines in Jenkins and Azure DevOps, standardizing containerized workflows.",
      "Achieved drift-free delivery using <strong>GitOps with ArgoCD</strong> across on-prem and cloud Kubernetes clusters.",
    ],
    tech: ["Terraform", "Ansible", "Kubernetes", "Docker", "Jenkins", "ArgoCD", "AWS", "Azure", "GCP"],
  },
  {
    category: "Cloud Migration",
    title: "Banregio Banking Infrastructure Migration (AWS → Azure)",
    concept:
      "High-compliance, zero-data-loss migration of banking infrastructure meeting financial regulatory requirements.",
    outcomes: [
      "Architected landing zones, networking (VNets, NSGs, Private Endpoints), and <strong>Azure AD RBAC</strong> identity structures to meet compliance.",
      "Migrated containerized microservices, databases, and storage from <strong>AWS (EKS, RDS, S3) to Azure (AKS, Azure SQL, Blob Storage)</strong> with zero data loss.",
    ],
    tech: ["AKS", "EKS", "Azure SQL", "Azure AD", "IAM", "VNets", "NSGs", "Blob Storage"],
  },
  {
    category: "Platform Engineering",
    title: "Self-Service Infrastructure & Incident Remediation Tooling",
    concept:
      "Internal Python-based automation tooling to eliminate manual toil and accelerate incident response.",
    outcomes: [
      "Built REST APIs using <strong>FastAPI & Flask</strong> for self-service infrastructure operations and automated runbook trigger scripts.",
      "Developed a custom <strong>Prometheus exporter</strong> and Slack-integrated incident bot, reducing toil by <strong>30%</strong>.",
      "Led P1 incident response with blameless postmortems and runbooks, reducing resolution time by <strong>25%</strong>.",
    ],
    tech: ["Python", "FastAPI", "Flask", "Prometheus", "Grafana", "Boto3", "Slack API"],
  },
  {
    category: "Serverless",
    title: "AWS Serverless Application Platform",
    concept:
      "Fully serverless file processing pipeline optimized for cost-efficiency at low-to-medium traffic.",
    outcomes: [
      "Built serverless pipeline with <strong>AWS Lambda, API Gateway, DynamoDB, and S3</strong> for real-time file processing.",
      "Reduced compute costs for low-traffic workloads by <strong>90%</strong> vs. equivalent EC2-based architecture.",
      "Automated infrastructure with <strong>Terraform</strong> and <strong>GitHub Actions</strong> CI/CD; integrated SNS alerts and CloudWatch monitoring.",
    ],
    tech: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "Terraform", "GitHub Actions", "CloudWatch", "SNS"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <span className="section-label">Proof of Work</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-desc">
          Key infrastructure initiatives with measurable outcomes — each
          anchored to real-world problems solved at scale.
        </p>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
