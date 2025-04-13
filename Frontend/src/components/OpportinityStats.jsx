import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import StatsComponent from "./utils/StatsComponent"

export default function OpportunityStats() {
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	if (loading) return <Typography>Loading data...</Typography>;
	if (error) return <Typography>Error loading data: {error}</Typography>;

	return (
		<StatsComponent data={opportunityData} isOpp={true} />
	)
}