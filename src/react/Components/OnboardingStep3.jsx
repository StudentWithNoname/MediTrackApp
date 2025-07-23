import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useOnboarding } from '../Context/OnboardingContext'
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  Box
} from '@mui/material'

const goalsOptions = [
  'Medikamente regelmäßig nehmen',
  'Besserer Überblick über Medikation',
  'Erinnerungen erhalten',
  'Daten mit Arzt teilen'
]

const OnboardingStep3 = ({ onNext, onBack }) => {
  const { userData, setUserData } = useOnboarding()
  const [selectedGoals, setSelectedGoals] = useState(userData.goals || [])

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    )
  }

  const handleSubmit = () => {
    setUserData((prev) => ({
      ...prev,
      goals: selectedGoals
    }))
    onNext()
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🎯 Was sind deine Ziele?
      </Typography>
      <FormGroup>
        {goalsOptions.map((goal) => (
          <FormControlLabel
            key={goal}
            control={
              <Checkbox
                checked={selectedGoals.includes(goal)}
                onChange={() => toggleGoal(goal)}
              />
            }
            label={goal}
          />
        ))}
      </FormGroup>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="outlined" onClick={onBack}>
          ← Zurück
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedGoals.length === 0}
        >
          Abschließen →
        </Button>
      </Box>
    </Container>
  )
}

OnboardingStep3.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

export default OnboardingStep3
