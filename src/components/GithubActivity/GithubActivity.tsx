import { useEffect, useRef, useState } from "react";
import styles from "./GithubActivity.module.css";
import { githubActivityContent } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type ContributionDay = { date: string; count: number; level: number };

type ApiResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

type MonthLabel = { weekIndex: number; label: string };

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      weeks: (ContributionDay | null)[][];
      monthLabels: MonthLabel[];
      total: number;
    };

function buildActivityGrid(contributions: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay();
  for (let i = 0; i < firstDay; i++) currentWeek.push(null);

  for (const day of contributions) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const rawLabels: MonthLabel[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstReal = week.find((d): d is ContributionDay => d !== null);
    if (!firstReal) return;
    const month = new Date(`${firstReal.date}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      rawLabels.push({
        weekIndex,
        label: new Date(`${firstReal.date}T00:00:00`).toLocaleString("en-US", {
          month: "short",
        }),
      });
      lastMonth = month;
    }
  });

  // Drop a label if it lands too close to the next one to avoid overlapping
  // text (e.g. a one-week sliver of a month at the very start of the range).
  const MIN_WEEK_GAP = 2;
  const monthLabels = rawLabels.filter((label, i) => {
    const next = rawLabels[i + 1];
    return !next || next.weekIndex - label.weekIndex >= MIN_WEEK_GAP;
  });

  return { weeks, monthLabels };
}

export default function GithubActivity() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);

  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubActivityContent.username}?y=last`,
      { cache: "no-store" }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        const { weeks, monthLabels } = buildActivityGrid(data.contributions);
        const total = Object.values(data.total)[0] ?? 0;
        setState({ status: "ready", weeks, monthLabels, total });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github-activity" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{githubActivityContent.index} —</span>
          <h2 className="section-title">{githubActivityContent.title}</h2>
        </div>

        {state.status === "loading" && (
          <p className={`${styles.message} mono`}>Loading activity…</p>
        )}

        {state.status === "error" && (
          <p className={`${styles.message} mono`}>
            Couldn't load GitHub activity.
          </p>
        )}

        {state.status === "ready" && (
          <>
            <div className={styles.scrollWrap}>
              <div className={styles.inner}>
                <div className={styles.months} aria-hidden="true">
                  {state.weeks.map((_, weekIndex) => {
                    const found = state.monthLabels.find(
                      (m) => m.weekIndex === weekIndex
                    );
                    return (
                      <span key={weekIndex} className={`${styles.monthLabel} mono`}>
                        {found?.label ?? ""}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.grid}>
                  {state.weeks.flat().map((day, i) => (
                    <div
                      key={i}
                      className={`${styles.cell} ${
                        day ? styles[`level${day.level}`] : styles.empty
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.summaryRow}>
              <span className={`${styles.summary} mono`}>
                {state.total} contributions in the last year
              </span>
              <div className={styles.legend}>
                <span className="mono">Less</span>
                <span className={`${styles.cell} ${styles.level0}`} />
                <span className={`${styles.cell} ${styles.level1}`} />
                <span className={`${styles.cell} ${styles.level2}`} />
                <span className={`${styles.cell} ${styles.level3}`} />
                <span className={`${styles.cell} ${styles.level4}`} />
                <span className="mono">More</span>
              </div>
            </div>
            <p className={`${styles.attribution} mono`}>
              via github-contributions-api.jogruber.de — may lag a few minutes
              behind GitHub's own live count
            </p>
          </>
        )}
      </div>
    </section>
  );
}
