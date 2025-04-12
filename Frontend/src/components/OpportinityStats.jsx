import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunityData } from '../redux/dataSlice';
import { TbCopy } from "react-icons/tb";
import './styles/stats.css';

export default function Opportunitystats() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error}</p>;

	return opportunityData.length > 0 && (
		<div className="summary-table-container">
			<TbCopy className='icon' />
			<table>
				<thead>
					<tr>
						<th id="left">Stage</th>
						<th className='center'>Came to Stage</th>
						<th className='red center'>Lost / Disqualified <br /> from stage</th>
						<th className='cream center'>Moved to next <br /> stage</th>
						<th className='center'>Win Rate %</th>
					</tr>
				</thead>
				<tbody>
					{opportunityData.map((item) => (
						<tr key={item.label}>
							<td id='left'>{item.label}</td>
							<td>{item.count}</td>
							<td>{item.disqualified >= 0 ? item.disqualified : '-'}</td>
							<td>{item.qualified || '-'}</td>
							<td>{`${item.wonPercent}%` || '-'}</td>
						</tr>
					))}
					<tr className='total'>
						<td id='left'>Total</td>
						<td>-</td>
						<td className='green'>{opportunityData[0].count - opportunityData[opportunityData.length - 1].count}</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</div >
	);
}