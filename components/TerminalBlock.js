"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TerminalBlock.module.css";

const scenes = [
  {
    cmd: "kubectl get nodes --context=prod-cluster",
    output: [
      { text: "NAME            STATUS   ROLES           AGE   VERSION", t: "dim" },
      { text: "prod-master-1   Ready    control-plane   42d   v1.29.2", t: "accent" },
      { text: "prod-node-1     Ready    <none>          42d   v1.29.2", t: "normal" },
      { text: "prod-node-2     Ready    <none>          42d   v1.29.2", t: "normal" },
      { text: "prod-node-3     Ready    <none>          42d   v1.29.2", t: "normal" },
    ],
  },
  {
    cmd: "terraform apply -auto-approve",
    output: [
      { text: "Terraform will perform the following actions:", t: "dim" },
      { text: "  + aws_eks_cluster.prod      will be created", t: "success" },
      { text: "  + aws_rds_instance.main     will be created", t: "success" },
      { text: "  ~ aws_iam_role.node_group   will be updated", t: "accent" },
      { text: "Apply complete! Resources: 8 added, 1 changed, 0 destroyed.", t: "success" },
    ],
  },
  {
    cmd: "aws sts get-caller-identity --profile prod",
    output: [
      { text: "{", t: "dim" },
      { text: '    "UserId":  "AROA...NITHEESH",', t: "accent" },
      { text: '    "Account": "prod-multicloud",', t: "accent" },
      { text: '    "Arn": "arn:aws:iam::cloud-engineer"', t: "accent" },
      { text: "}", t: "dim" },
    ],
  },
  {
    cmd: "helm upgrade --install monitoring kube-prometheus-stack",
    output: [
      { text: 'Release "monitoring" has been upgraded. Happy Helming!', t: "success" },
      { text: "STATUS: deployed", t: "success" },
      { text: "Grafana available at: http://grafana.monitoring.svc", t: "dim" },
      { text: "Prometheus scraping 94 targets ✓", t: "accent" },
    ],
  },
];

const TYPE_DELAY = 38;
const OUT_STEP = 72;
const PAUSE = 2600;

export default function TerminalBlock() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [cmdText, setCmdText] = useState("");
  const [outputLines, setOutputLines] = useState([]);
  const tids = useRef([]);

  useEffect(() => {
    tids.current.forEach(clearTimeout);
    tids.current = [];
    setCmdText("");
    setOutputLines([]);

    const scene = scenes[sceneIdx];

    [...scene.cmd].forEach((_, i) => {
      tids.current.push(
        setTimeout(() => setCmdText(scene.cmd.slice(0, i + 1)), (i + 1) * TYPE_DELAY)
      );
    });

    const base = scene.cmd.length * TYPE_DELAY + 200;
    scene.output.forEach((line, i) => {
      tids.current.push(
        setTimeout(() => setOutputLines((p) => [...p, line]), base + i * OUT_STEP)
      );
    });

    const total = base + scene.output.length * OUT_STEP + PAUSE;
    tids.current.push(
      setTimeout(() => setSceneIdx((v) => (v + 1) % scenes.length), total)
    );

    return () => tids.current.forEach(clearTimeout);
  }, [sceneIdx]);

  const typeClass = { dim: styles.dim, accent: styles.accentOut, success: styles.successOut, normal: "" };

  return (
    <div className={styles.terminal}>
      <div className={styles.bar}>
        <span className={styles.dotRed} />
        <span className={styles.dotYellow} />
        <span className={styles.dotGreen} />
        <span className={styles.barTitle}>nitheesh@prod-cluster:~</span>
      </div>
      <div className={styles.body}>
        {outputLines.map((line, i) => (
          <div key={i} className={`${styles.out} ${typeClass[line.t] ?? ""}`}>
            {line.text}
          </div>
        ))}
        <div className={styles.promptRow}>
          <span className={styles.ps}>$&nbsp;</span>
          <span className={styles.cmdText}>{cmdText}</span>
          <span className={styles.cursor} />
        </div>
      </div>
    </div>
  );
}
