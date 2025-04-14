import React, { useState } from "react";
import styles from "./Dashboard.module.css";

// Importing Charts and tables
import { OpportunityChart, OpportinityStats, AcvChart, AcvStats } from "../../components";

// Dashboard layout with charts and stats
export default function Dashboard() {

    const [tab, setTab] = useState("summary");

    return (
        <div className={styles.container}>
            <header>
                <ul>
                    <li className={`${tab === "summary" && styles.active}`} onClick={() => setTab("summary")} >SUMMARY</li>
                    <li className={`${tab === "whatif" && styles.active}`} onClick={() => setTab("whatif")} >WHAT-IF</li>
                </ul>
            </header>
            {
                tab === "summary" ? (
                    <>
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
                    </>
                ) : (
                    <p className={styles.center}>WHAT-IF</p>
                )
            }
        </div>
    );
};
