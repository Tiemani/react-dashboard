import React from 'react';
import '../styles/ReportsPending.css';

const ReportsPending = () => {
  const reports = [
    { id: 1, title: 'Report 1', status: 'Pending' },
    { id: 2, title: 'Report 2', status: 'Pending' },
  ];

  return (
    <div className="reports-pending">
      <h2>Pending Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.title} - {report.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPending;