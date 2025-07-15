import React, { useState } from 'react'
import OnboardingStep1 from '../Components/OnboardingStep1'
import OnboardingStep2 from '../Components/OnboardingStep2'

const Onboarding = () => {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} />}
      {step === 2 && (
        <OnboardingStep2
          onBack={() => setStep(1)}
          onNext={() => console.log('Fertig!')}
        />
      )}
    </>
  )
}

export default Onboarding
