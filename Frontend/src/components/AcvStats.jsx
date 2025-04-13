import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import StatsComponent from "./utils/StatsComponent"

export default function AcvStats() {
	const { acvData, loading, error } = useSelector((state) => state.data);

	if (loading) return <Typography>Loading data...</Typography>;
	if (error) return <Typography>Error loading data: {error}</Typography>;

	return (
		<StatsComponent data={acvData} isOpp={false}/>
	)
}