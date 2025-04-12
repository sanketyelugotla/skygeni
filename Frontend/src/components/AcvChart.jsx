import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchACVData } from '../redux/dataSlice';
import './styles/chart.css'; // Import the CSS

export default function AcvChart() {
	const dispatch = useDispatch();
	const { acvData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchACVData());
	}, [dispatch]);

	if (loading) return <p>Loading ACV data...</p>;
	if (error) return <p>Error loading ACV data: {error}</p>;
	if (!acvData || acvData.length === 0) return <p>No ACV data available.</p>;

	const total = acvData[0]?.acv || 0;

	return (
		<div className="win-rate-by-count-chart">
			<h3 className='title'>Win Rate by ACV: {acvData[0]?.wonPercent || 0}%</h3>
			<div className='line' />
			<div className='wholeChart'>
				<ul className="chart-list">
					{acvData.map((item) => (
						<li key={item.label} className="chart-item">
							<span className="stage-label">{item.label}</span>
							<div className="progress-wrapper">
								<div className="progress-bar-wrapper">
									<div className="progress-bar-container">
										<div
											className="progress-bar"
											style={{ width: `${(item.acv / total * 100) || 0}%` }}
										>
											<span className="bar-label">${item.acv.toLocaleString('en', { useGrouping: true })}</span>
										</div>
									</div>
									<span className="won-percent">{item.wonPercent}%</span>
								</div>
								<div className="qualify-percent">
									<span>{item.qualifyPercent}%</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}