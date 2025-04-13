import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchACVData } from '../redux/dataSlice';
import ChartComponent from './utils/ChartComponent';

export default function AcvChart() {
	const dispatch = useDispatch();
	const { acvData, loading, error } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(fetchACVData());
	}, [dispatch]);

	if (loading) return <p>Loading ACV data...</p>;
	if (error) return <p>Error loading ACV data: {error}</p>;
	if (!acvData || acvData.length === 0) return <p>No ACV data available.</p>;


	return (
		<ChartComponent data={acvData} title={`Win Rate by ACV: ${acvData[0]?.wonPercent || 0}%`} isAcv={true} />
	);
}