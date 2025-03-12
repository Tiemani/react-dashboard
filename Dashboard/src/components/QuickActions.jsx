import React from 'react';
import '../styles/QuickActions.css';

const QuickActions = () => {
  const handleNewSearch = () => {
    alert('Starting a new search...');
  };

  const handleAccessReports = () => {
    alert('Accessing pending reports...');
  };

  const handleAddIncident = () => {
    alert('Adding a new incident or object...');
  };

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <button onClick={handleNewSearch}>Start a New Search</button>
      <button onClick={handleAccessReports}>Access Reports Pending</button>
      <button onClick={handleAddIncident}>Add an Incident or Object</button>
    </div>
  );
};

export default QuickActions;