import React, { useEffect } from 'react';

// For fetching ad retriving data from redux store
import { useSelector, useDispatch } from 'react-redux';
import { fetchACVData } from '../redux/dataSlice';

// Import for material ui
import { Typography } from '@mui/material';

// Rsusable chart compoment
import ChartComponent from './utils/ChartComponent';

export default function AcvChart() {
	const dispatch = useDispatch();
	const { acvData, loading, error } = useSelector((state) => state.data);

	// Fetch ACV data on component mount
	useEffect(() => {
		dispatch(fetchACVData());
	}, [dispatch]);

	// Conditional rendering based on API state
	if (loading) return <Typography>Loading ACV data...</Typography>;
	if (error) return <Typography>Error loading ACV data: {error}</Typography>;
	if (!acvData || acvData.length === 0) return <Typography>No ACV data available.</Typography>;

	// Render chart with fetched data
	return (
		<ChartComponent
			data={acvData}
			title={`Win Rate by ACV: ${acvData[0]?.wonPercent || 0}%`}
			isChart={false}
		/>
	);
}
