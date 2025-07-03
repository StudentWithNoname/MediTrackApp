import React, { useState } from 'react';

const standardMedicationOptions = [
  { name: 'Ramipril', dosage: '5mg' },
  { name: 'Metformin', dosage: '850mg' },
  { name: 'L-Thyroxin', dosage: '100μg' },
  { name: 'Amlodipin', dosage: '10mg' },
  { name: 'Simvastatin', dosage: '20mg' },
  { name: 'Pantoprazol', dosage: '40mg' },
  { name: 'Bisoprolol', dosage: '2.5mg' },
  { name: 'ASS', dosage: '100mg' },
  { name: 'Atorvastatin', dosage: '20mg' },
  { name: 'Furosemid', dosage: '20mg' },
];

const StandardMedicationForm = () => {
  const [selectedMedication, setSelectedMedication] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const med = standardMedicationOptions.find((m) => m.name === selectedMedication);
    if (!med || !frequency) return;

    const entry = {
      name: med.name,
      dosage: med.dosage,
      frequency: frequency,
    };

    const stored = JSON.parse(localStorage.getItem('standardMedications')) || [];
    stored.push(entry);
    localStorage.setItem('standardMedications', JSON.stringify(stored));

    alert('Standard-Medikation gespeichert!');
    setSelectedMedication('');
    setFrequency('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Medikament:</label>
        <select
          value={selectedMedication}
          onChange={(e) => setSelectedMedication(e.target.value)}
          required
        >
          <option value="">Bitte wählen</option>
          {standardMedicationOptions.map((med) => (
            <option key={med.name} value={med.name}>
              {med.name} – {med.dosage}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Einnahmehäufigkeit (pro Tag):</label>
        <input
          type="number"
          min="1"
          max="10"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        />
      </div>

      <button type="submit">Speichern</button>
    </form>
  );
};

export default StandardMedicationForm;
