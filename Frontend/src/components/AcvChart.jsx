import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchACVData } from '../redux/dataSlice';
import { Typography } from '@mui/material';

import ChartComponent from './utils/ChartComponent';

export default function AcvChart() {
	const dispatch = useDispatch();
	const { acvData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchACVData());
	}, [dispatch]);

	if (loading) return <Typography>Loading ACV data...</Typography>;
	if (error) return <Typography>Error loading ACV data: {error}</Typography>;
	if (!acvData || acvData.length === 0) return <Typography>No ACV data available.</Typography>;


	return (
		<ChartComponent data={acvData} title={`Win Rate by ACV: ${acvData[0]?.wonPercent || 0}%`} isChart={false} />
	);
}