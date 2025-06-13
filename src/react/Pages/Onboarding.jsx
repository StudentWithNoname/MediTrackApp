import React from 'react';
import RegisterForm from '../Components/RegisterForm';

const Onboarding = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>MediTrack – Willkommen!</h1>
      <p>Bitte gib deine Daten ein, um loszulegen:</p>
      <RegisterForm />
    </div>
  );
};

export default Onboarding;
