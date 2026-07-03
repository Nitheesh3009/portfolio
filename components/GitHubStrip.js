import styles from "./GitHubStrip.module.css";

const USERNAME = "Nitheesh3009";
const DAYS = 60;

async function getEvents() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function buildDayMap(events) {
  const map = {};
  const now = new Date();

  for (let i = 0; i < DAYS; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    map[d.toISOString().slice(0, 10)] = 0;
  }

  for (const e of events) {
    const day = e.created_at?.slice(0, 10);
    if (day && map[day] !== undefined) map[day]++;
  }

  return map;
}

function intensity(count) {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

const EVENT_LABELS = {
  PushEvent: "pushed to",
  PullRequestEvent: "opened PR in",
  CreateEvent: "created branch in",
  IssuesEvent: "opened issue in",
  PullRequestReviewEvent: "reviewed PR in",
  WatchEvent: "starred",
  ForkEvent: "forked",
};

export default async function GitHubStrip() {
  const events = await getEvents();
  const dayMap = buildDayMap(events);

  const days = Object.entries(dayMap).reverse(); // oldest → newest
  const activeDays = days.filter(([, c]) => c > 0).length;
  const totalEvents = days.reduce((s, [, c]) => s + c, 0);
  const repos = [...new Set(events.map((e) => e.repo?.name).filter(Boolean))];

  const recent = events
    .filter((e) => EVENT_LABELS[e.type])
    .slice(0, 4)
    .map((e) => ({
      type: e.type,
      repo: e.repo?.name?.split("/")[1] ?? e.repo?.name ?? "unknown",
      date: new Date(e.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));

  if (totalEvents === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className="section-label">Live Activity</span>
            <h2 className={styles.title}>GitHub Contributions</h2>
            <p className={styles.sub}>Last 60 days of public activity · updates every hour</p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statVal}>{totalEvents}</span>
              <span className={styles.statLabel}>contributions</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>{activeDays}</span>
              <span className={styles.statLabel}>active days</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>{repos.length}</span>
              <span className={styles.statLabel}>repos touched</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.grid}>
            {days.map(([date, count]) => (
              <div
                key={date}
                className={`${styles.cell} ${styles[`lvl${intensity(count)}`]}`}
                title={`${date}: ${count} contribution${count !== 1 ? "s" : ""}`}
              />
            ))}
          </div>

          <div className={styles.gridFooter}>
            <span className={styles.gridLabel}>2 months ago</span>
            <div className={styles.legend}>
              <span className={styles.legendLabel}>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`${styles.cell} ${styles[`lvl${l}`]}`} />
              ))}
              <span className={styles.legendLabel}>More</span>
            </div>
            <span className={styles.gridLabel}>Today</span>
          </div>
        </div>

        {recent.length > 0 && (
          <div className={styles.feed}>
            {recent.map((e, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={styles.feedDot} />
                <span className={styles.feedText}>
                  <span className={styles.feedAction}>{EVENT_LABELS[e.type]}</span>
                  {" "}
                  <span className={styles.feedRepo}>{e.repo}</span>
                </span>
                <span className={styles.feedDate}>{e.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
