import React, { useState } from 'react';
import '../styles/IncidentForm.css';

const IncidentForm = () => {
  const [incident, setIncident] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Incident added: ${incident}`);
    setIncident('');
  };

  return (
    <div className="incident-form">
      <h2>Add an Incident or Object</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="Describe the incident or object"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IncidentForm;