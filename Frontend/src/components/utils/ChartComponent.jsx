import React from 'react';
import '../styles/chart.css';

export default function ChartComponent({ data, title, isAcv }) {
    const total = isAcv ? data[0]?.acv || 0 : data[0]?.count || 0;

    return (
        <div className="win-rate-by-count-chart">
            <h3 className='title'>{title}</h3>
            <div className='line' />
            <div className='wholeChart'>
                <ul className="chart-list">
                    {data.map((item) => (
                        <li key={item.label} className="chart-item">
                            <span className="stage-label">{item.label}</span>
                            <div className="progress-wrapper">
                                <div className="progress-bar-wrapper">
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${((isAcv ? item.acv : item.count) / total * 100) || 0}%` }}
                                        >
                                            <span className="bar-label">
                                                {isAcv
                                                    ? `$${(item.acv ?? 0).toLocaleString('en', { useGrouping: true })}`
                                                    : item.count}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="won-percent">{item.wonPercent}%</span>
                                </div>
                                {item.label !== "Won" &&
                                    <div className="qualify-percent">
                                        {item.qualifyPercent}%
                                    </div>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
