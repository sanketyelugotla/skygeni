import React from 'react';
import { useSelector } from 'react-redux';
import './styles/stats.css'; // Create this CSS file

export default function AcvStats() {
  const { acvData, loading, error } = useSelector((state) => state.data);


  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="summary-table-container">
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Came to Stage</th>
            <th>Lost / Disqualified from stage</th>
            <th>Moved to next stage</th>
            <th>Win Rate %</th>
          </tr>
        </thead>
        <tbody>
          {acvData.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{item.acv}</td>
              <td>{item.disqualified >= 0 ? item.disqualified : '-'}</td>
              <td>{item.qualified || '-'}</td>
              <td>{item.wonPercent || '-'}</td>
            </tr>
          ))}
          {/* Optional: Add a total row if your data includes it */}
        </tbody>
      </table>
    </div>
  );
}