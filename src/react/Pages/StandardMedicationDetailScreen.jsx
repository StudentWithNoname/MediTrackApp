import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOnboarding } from '../Context/OnboardingContext'
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from '@mui/material'
import StandardMedicationForm from '../Components/StandardMedicationForm'


const StandardMedicationDetailScreen = () => {
  const { id } = useParams()
  const { userData, setUserData } = useOnboarding()

  const med = userData.medications?.find((m) => m.id === id)

  const [name, setName] = useState(med?.name || '')
  const [dosage, setDosage] = useState(med?.dosage || '')
  const [frequency, setFrequency] = useState(med?.frequency || '')

  const handleUpdate = () => {
    const updatedList = userData.medications.map((m) =>
      m.id === id ? { ...m, name, dosage, frequency } : m
    )
    setUserData((prev) => ({ ...prev, medications: updatedList }))
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Medikament bearbeiten
      </Typography>

      {!med ? (
        <Typography variant="body1" color="error">
          Medikament nicht gefunden.
        </Typography>
      ) : (
        <>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Dosierung"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Frequenz (pro Tag)"
            type="number"
            inputProps={{ min: 1 }}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleUpdate}>
            Aktualisieren
          </Button>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Neues Medikament hinzufügen
          </Typography>

          <StandardMedicationForm />
        </>
      )}
    </Box>
  )
}

export default StandardMedicationDetailScreen
