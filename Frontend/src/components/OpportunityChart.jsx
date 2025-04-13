import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunityData } from '../redux/dataSlice';
import ChartComponent from './utils/ChartComponent';

export default function OpportunityChart() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchOpportunityData());
	}, [dispatch]);

	if (loading) return <p>Loading opportunity data...</p>;
	if (error) return <p>Error loading opportunity data: {error}</p>;
	if (!opportunityData || opportunityData.length === 0) return <p>No opportunity data available.</p>;


	return (
		<ChartComponent data={opportunityData} title={`Win Rate by Opportunity Count: ${opportunityData[0]?.wonPercent || 0}%`}/>
	);
}