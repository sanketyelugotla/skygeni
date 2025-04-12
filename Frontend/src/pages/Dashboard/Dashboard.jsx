import React from "react";
import styles from "./Dashboard.module.css";
import { OpportunityChart, OpportinityStats, AcvChart, AcvStats } from "../../components";


export default function Dashboard() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.chart}><OpportunityChart /></div>
                <div className={styles.chart}><AcvChart /></div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.stats} ${styles.statsContainer}`}><OpportinityStats /></div>
                <div className={`${styles.stats} ${styles.statsContainer}`}><AcvStats /></div>
            </div>
        </div>
    );
};
