"use client";
import { useState } from "react";
import styles from "./YamlResume.module.css";

const yaml = [
  { t: "meta", text: "apiVersion: nitheesh.dev/v1" },
  { t: "meta", text: "kind: Engineer" },
  { t: "key", text: "metadata:" },
  { t: "val", text: "  name: Nitheesh Edla" },
  { t: "val", text: "  location: Dallas, Texas" },
  { t: "val", text: "  available: true" },
  { t: "key", text: "spec:" },
  { t: "key", text: "  experience:" },
  { t: "val", text: "    yearsTotal: 7" },
  { t: "val", text: "    current: Cloud Engineer @ CNET Global" },
  { t: "key", text: "  certifications:" },
  { t: "accent", text: "    - CKA" },
  { t: "accent", text: "    - AWS-SAA-C03" },
  { t: "accent", text: "    - AZ-400" },
  { t: "accent", text: "    - AZ-104" },
  { t: "key", text: "  skills:" },
  { t: "key", text: "    cloud: [AWS, Azure, GCP]" },
  { t: "key", text: "    iac: [Terraform, Ansible, Bicep]" },
  { t: "key", text: "    containers: [Kubernetes, Docker, Helm]" },
  { t: "key", text: "    observability: [Prometheus, Grafana, Loki]" },
  { t: "key", text: "  impact:" },
  { t: "success", text: "    releaseSpeed: +40%" },
  { t: "success", text: "    cveReduction: -90%" },
  { t: "success", text: "    costSavings: -40%" },
  { t: "success", text: "    uptime: 99.8%" },
  { t: "key", text: "status:" },
  { t: "success", text: "  phase: OpenToWork" },
  { t: "val", text: "  roles: [Cloud Engineer, DevOps Engineer, SRE, Platform Engineer]" },
  { t: "val", text: "  workMode: [Onsite, Hybrid, Remote]" },
];

export default function YamlResume() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button className={styles.toggle} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="yaml-block">
        <span className={styles.toggleIcon}>{open ? "▾" : "▸"}</span>
        <span className={styles.toggleLabel}>
          <span className={styles.keyword}>kind</span>
          <span className={styles.colon}>:</span>
          <span className={styles.value}> Engineer</span>
        </span>
        <span className={styles.pill}>{open ? "collapse" : "view manifest"}</span>
      </button>

      {open && (
        <div id="yaml-block" className={styles.block}>
          <div className={styles.lineNums} aria-hidden="true">
            {yaml.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <pre className={styles.code}>
            {yaml.map((line, i) => (
              <div key={i} className={`${styles.line} ${styles[line.t]}`}>
                {line.text}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
