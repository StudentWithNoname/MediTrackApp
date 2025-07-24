import React from 'react'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ExtraMedicationForm from '../Components/ExtraMedicationForm'

const ExtraMedicationScreen = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ExtraMedicationForm />

      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() => navigate('/dashboard')}
      >
        Zurück zum Dashboard
      </Button>
    </Container>
  )
}

export default ExtraMedicationScreen
