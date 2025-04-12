import React from 'react';
import { useSelector } from 'react-redux';
import { TbCopy } from "react-icons/tb";

import './styles/stats.css';

export default function AcvStats() {
	const { acvData, loading, error } = useSelector((state) => state.data);


	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error}</p>;

	return acvData.length > 0 && (
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
					{acvData.map((item) => (
						<tr key={item.label}>
							<td id='left'>{item.label}</td>
							<td>{item.acv.toLocaleString('en', { useGrouping: true })}</td>
							<td>{item.disqualified >= 0 ? item.disqualified.toLocaleString('en', { useGrouping: true }) : '-'}</td>
							<td>{item.qualified.toLocaleString('en', { useGrouping: true }) || '-'}</td>
							<td>{`${item.wonPercent}%` || '-'}</td>
						</tr>
					))}
					<tr>
						<td id='left'>Total</td>
						<td>-</td>
						<td className='green'>{(acvData[0].acv - acvData[acvData.length - 1].acv).toLocaleString('en', { useGrouping: true })}</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}