import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunityData } from '../redux/dataSlice';
import './styles/chart.css'; // Import the CSS

export default function OpportunityChart() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchOpportunityData());
	}, [dispatch]);

	if (loading) return <p>Loading opportunity data...</p>;
	if (error) return <p>Error loading opportunity data: {error}</p>;
	if (!opportunityData || opportunityData.length === 0) return <p>No opportunity data available.</p>;

	const total = opportunityData[0]?.count || 0;

	return (
		<div className="win-rate-by-count-chart">
			<h3 className='title'>Win Rate by Opportunity Count: {opportunityData[0]?.wonPercent || 0}%</h3>
			<div className='wholeChart'>
				<ul className="chart-list">
					{opportunityData.map((item) => (
						<li key={item.label} className="chart-item">
							<span className="stage-label">{item.label}</span>
							<div className='total-progress-bar'>
								<div className="progress-bar-wrapper">
									<div className="progress-bar-container">
										<div
											className="progress-bar"
											style={{ width: `${(item.count / total * 100) || 0}%` }}
										>
											<span className="bar-label">{item.count}</span>
										</div>
									</div>
									<span className="won-percent">{item.wonPercent}%</span>
								</div>
								<span className="qualify-percent">{item.qualifyPercent}%</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}