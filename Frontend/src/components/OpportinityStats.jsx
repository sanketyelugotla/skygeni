import React from 'react';

// For retriving data from redux store
import { useSelector } from 'react-redux';

// Material ui component
import { Typography } from '@mui/material';

// Reusable table component
import StatsComponent from "./utils/StatsComponent";

export default function OpportunityStats() {
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	// Show loading or error messages if needed
	if (loading) return <Typography>Loading data...</Typography>;
	if (error) return <Typography>Error loading data: {error}</Typography>;

	// Render stats component with opportunity data
	return (
		<StatsComponent data={opportunityData} isOpp={true} />
	);
}
