import React from 'react';

// For getting fetched data from redux store
import { useSelector } from 'react-redux';

// Import for material ui
import { Typography } from '@mui/material';

// Reusable table component
import StatsComponent from "./utils/StatsComponent";

export default function AcvStats() {
	const { acvData, loading, error } = useSelector((state) => state.data);

	// Handle loading and error states
	if (loading) return <Typography>Loading data...</Typography>;
	if (error) return <Typography>Error loading data: {error}</Typography>;

	// Render stats with ACV data
	return (
		<StatsComponent data={acvData} isOpp={false} />
	);
}
