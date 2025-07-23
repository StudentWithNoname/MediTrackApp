import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingStep1 from '../Components/OnboardingStep1'
import OnboardingStep2 from '../Components/OnboardingStep2'
import OnboardingStep3 from '../Components/OnboardingStep3'

import { Container, Box, Paper, Typography } from '@mui/material'

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Onboarding
          </Typography>

          {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <OnboardingStep2
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <OnboardingStep3
              onBack={() => setStep(2)}
              onNext={() => {
                console.log('Onboarding abgeschlossen!')
                navigate('/dashboard')
              }}
            />
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Onboarding
