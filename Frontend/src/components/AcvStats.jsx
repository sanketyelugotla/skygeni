import React from 'react';
import { useSelector } from 'react-redux';
import StatsComponent from './utils/StatsComponent';

export default function AcvStats() {
	const { acvData, loading, error } = useSelector((state) => state.data);

	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error}</p>;

	return (
		<StatsComponent data={acvData} isACV={true} />
	);
}