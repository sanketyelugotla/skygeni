import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { fetchOpportunityData } from '../redux/dataSlice';

import ChartComponent from './utils/ChartComponent';

export default function OpportunityChart() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchOpportunityData());
	}, [dispatch]);

	if (loading) return <Typography>Loading opportunity data...</Typography>;
	if (error) return <Typography>Error loading opportunity data: {error}</Typography>;
	if (!opportunityData || opportunityData.length === 0) return <Typography>No opportunity data available.</Typography>;

	return (
		<ChartComponent data={opportunityData} title={`Win Rate by Opportunity Count: ${opportunityData[0]?.wonPercent || 0}%`} isChart={true} />
	);
}