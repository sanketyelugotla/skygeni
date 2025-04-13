import React, { useEffect } from 'react';

// For fetching and retriving data from redux store
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunityData } from '../redux/dataSlice';

// Material ui component
import { Typography } from '@mui/material';

// Reusable chart component
import ChartComponent from './utils/ChartComponent';

export default function OpportunityChart() {
	const dispatch = useDispatch();
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	// Fetch opportunity data when the component mounts
	useEffect(() => {
		dispatch(fetchOpportunityData());
	}, [dispatch]);

	// Handle loading, error, or empty state
	if (loading) return <Typography>Loading opportunity data...</Typography>;
	if (error) return <Typography>Error loading opportunity data: {error}</Typography>;
	if (!opportunityData || opportunityData.length === 0) return <Typography>No opportunity data available.</Typography>;

	// Render chart with fetched opportunity data
	return (
		<ChartComponent
			data={opportunityData}
			title={`Win Rate by Opportunity Count: ${opportunityData[0]?.wonPercent || 0}%`}
			isChart={true}
		/>
	);
}
