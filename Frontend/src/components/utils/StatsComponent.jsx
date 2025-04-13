import React from 'react';
import { useSelector } from 'react-redux';
import { TbCopy } from "react-icons/tb";

import '../styles/stats.css';

export default function StatsComponent({ data, isACV }) {

    return data.length > 0 && (
        <div className="summary-table-container">
            <TbCopy className='icon' />
            <table>
                <thead>
                    <tr>
                        <th id='left'>Stage</th>
                        <th>Came to Stage</th>
                        <th className='red'>Lost / Disqualified <br /> from stage</th>
                        <th className='cream'>Moved to next  <br /> stage</th>
                        <th>Win Rate %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.label}>
                            <td id='left'>{item.label}</td>
                            <td>{isACV ? item.acv.toLocaleString('en', { useGrouping: true }) : item.count}</td>
                            <td>{item.disqualified >= 0 ? item.disqualified.toLocaleString('en', { useGrouping: true }) : '-'}</td>
                            <td>{item?.qualified?.toLocaleString('en', { useGrouping: true }) || '-'}</td>
                            <td>{`${item.wonPercent}%` || '-'}</td>
                        </tr>
                    ))}
                    <tr className='total'>
                        <td id='left'>Total</td>
                        <td>-</td>
                        <td className='green'>
                            {
                                isACV ? (
                                    data[0].acv - data[data.length - 1].acv).toLocaleString('en', { useGrouping: true }
                                    )
                                    : (
                                        data[0].count - data[data.length - 1].count).toLocaleString('en', { useGrouping: true }
                                        )
                            }
                        </td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}