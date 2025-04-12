import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchACVData, fetchOpportunityData } from '../redux/dataSlice';

export default function OpportunityChart() {
  const dispatch = useDispatch();

  // Fetch data from Redux state
  const { acvData, opportunityData, loading, error } = useSelector((state) => state.data);

  // Fetch the data when component mounts
  useEffect(() => {
    dispatch(fetchACVData());
    dispatch(fetchOpportunityData());
  }, [dispatch]);

  // Loading/Error UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render the data
  return (
    <div>
      <h2>Opportunity Chart</h2>

      <h3>ACV Data:</h3>
      <pre>{JSON.stringify(acvData, null, 2)}</pre>

      <h3>Opportunity Count Data:</h3>
      <pre>{JSON.stringify(opportunityData, null, 2)}</pre>
    </div>
  );
}
