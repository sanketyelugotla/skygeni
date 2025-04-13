import React from "react";
import styles from "./Dashboard.module.css";

// Importing Charts and tables
import { OpportunityChart, OpportinityStats, AcvChart, AcvStats } from "../../components";

// Dashboard layout with charts and stats
export default function Dashboard() {
    return (
        <div className={styles.container}>
            {/* First row: charts */}
            <div className={styles.row}>
                <div className={styles.chart}><OpportunityChart /></div>
                <div className={styles.chart}><AcvChart /></div>
            </div>

            {/* Second row: statistics panels */}
            <div className={styles.row}>
                <div className={`${styles.stats} ${styles.statsContainer}`}><OpportinityStats /></div>
                <div className={`${styles.stats} ${styles.statsContainer}`}><AcvStats /></div>
            </div>
        </div>
    );
};
