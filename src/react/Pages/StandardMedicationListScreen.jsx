import React, { useEffect, useState } from 'react';

const StandardMedicationListScreen = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('standardMedications')) || [];
    setMedications(stored);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('standardMedications');
    setMedications([]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Gespeicherte Standard-Medikationen</h2>

      {medications.length === 0 ? (
        <p>Keine Einträge vorhanden.</p>
      ) : (
        <ul>
          {medications.map((med, index) => (
            <li key={index}>
              <strong>{med.name}</strong> – {med.dosage}, {med.frequency}× täglich
            </li>
          ))}
        </ul>
      )}

      {medications.length > 0 && (
        <button onClick={handleClearAll} style={{ marginTop: '1rem' }}>
          Alle löschen
        </button>
      )}
    </div>
  );
};

export default StandardMedicationListScreen;
