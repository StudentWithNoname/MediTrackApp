import React, { useState } from 'react'
import OnboardingStep1 from '../Components/OnboardingStep1'
import OnboardingStep2 from '../Components/OnboardingStep2'
import OnboardingStep3 from '../Components/OnboardingStep3'

import './OnboardingContainer.css' // Optional: Wenn du Styles verwendest

const OnboardingContainer = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    console.log(`[Container] Gehe zu Schritt ${step + 1}`)
    if (step < 3) setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    console.log(`[Container] Gehe zurück zu Schritt ${step - 1}`)
    if (step > 1) setStep((prev) => prev - 1)
  }

  const renderStep = () => {
    console.log('[Container] Aktueller Schritt:', step)
    switch (step) {
      case 1:
        return <OnboardingStep1 onNext={handleNext} />
      case 2:
        return <OnboardingStep2 onNext={handleNext} onBack={handleBack} />
      case 3:
        return <OnboardingStep3 onNext={() => alert('🎉 Onboarding abgeschlossen!')} onBack={handleBack} />
      default:
        return <p>Unbekannter Schritt. Bitte neu laden.</p>
    }
  }

  return (
    <div className="onboarding-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="step-wrapper">
        {renderStep()}
      </div>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Schritt
        {step}
        von 3
      </p>
    </div>
  )
}

export default OnboardingContainer
