import React from 'react'
import OnboardingStep1 from '../Components/OnboardingStep1'

const Onboarding = () => (
  <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
    <h1>MediTrack – Willkommen!</h1>
    <p>Bitte gib deine Daten ein, um loszulegen:</p>
    <OnboardingStep1 />
  </div>
)

export default Onboarding
