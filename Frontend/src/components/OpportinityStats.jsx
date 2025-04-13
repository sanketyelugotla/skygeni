import React from 'react';
import { useSelector } from 'react-redux';
import './styles/stats.css';
import StatsComponent from './utils/StatsComponent';

export default function Opportunitystats() {
	const { opportunityData, loading, error } = useSelector((state) => state.data);

	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error}</p>;

	return (
		<StatsComponent data={opportunityData} isACV={false} />
	)
}