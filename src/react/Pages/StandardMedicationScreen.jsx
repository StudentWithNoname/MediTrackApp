import React from 'react';
import StandardMedicationForm from '../Components/StandardMedicationForm';
console.log('✅ StandardMedicationScreen geladen');

const StandardMedicationScreen = () => (
  <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Standard-Medikation hinzufügen</h2>
      <StandardMedicationForm />
    </div>
  );

export default StandardMedicationScreen;
