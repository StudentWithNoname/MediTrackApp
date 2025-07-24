import React, { useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'

import { useOnboarding } from '../Context/OnboardingContext'

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
  { name: 'Furosemid', dosage: '20mg' }
]

const StandardMedicationForm = () => {
  const { userData, setUserData } = useOnboarding()
  const [selectedMedication, setSelectedMedication] = useState('')
  const [frequency, setFrequency] = useState('')
  const [message, setMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const med = standardMedicationOptions.find((m) => m.name === selectedMedication)
    if (!med || !frequency) return

    const stored = userData.medications || []
    const exists = stored.some((m) => m.name === med.name)

    if (exists) {
      setMessage(`${med.name} ist bereits gespeichert.`)
      setAlertType('error')
      setOpen(true)
      return
    }

    const entry = {
      id: crypto.randomUUID(),
      name: med.name,
      dosage: med.dosage,
      frequency
    }

    setUserData((prev) => ({
      ...prev,
      medications: [...(prev.medications || []), entry]
    }))

    setMessage('Medikation erfolgreich gespeichert.')
    setAlertType('success')
    setOpen(true)

    setSelectedMedication('')
    setFrequency('')
  }

  const handleDeleteStandardMed = (index) => {
    const updatedMeds = [...(userData.medications || [])]
    updatedMeds.splice(index, 1)

    setUserData((prev) => ({
      ...prev,
      medications: updatedMeds
    }))
  }

  return (
    <>
      <Box
        id="standard-med-form"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: { xs: '90%', sm: '400px' },
          paddingTop: { xs: '2rem', sm: '3rem', md: '4rem' },
          paddingX: 2,
          marginX: 'auto'
        }}
      >
        <Typography variant="h6">Standard-Medikation hinzufügen</Typography>

        <FormControl fullWidth required>
          <InputLabel>Medikament</InputLabel>
          <Select
            value={selectedMedication}
            label="Medikament"
            onChange={(e) => setSelectedMedication(e.target.value)}
          >
            {standardMedicationOptions.map((med) => (
              <MenuItem key={med.name} value={med.name}>
                {med.name} – {med.dosage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Einnahmehäufigkeit (pro Tag)"
          type="number"
          inputProps={{ min: 1, max: 10 }}
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
          fullWidth
        />

        <Button variant="contained" type="submit">
          Speichern
        </Button>
      </Box>

      <Box
        sx={{
          mt: 4,
          mx: 'auto',
          maxWidth: { xs: '90%', sm: '400px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h6">Gespeicherte Standard-Medikation</Typography>
        {(userData.medications || []).map((med, index) => (
          <Box key={med.id || index} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
            <Typography><strong>Medikament:</strong> {med.name}</Typography>
            <Typography><strong>Dosierung:</strong> {med.dosage}</Typography>
            <Typography><strong>Häufigkeit:</strong> {med.frequency}× täglich</Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => handleDeleteStandardMed(index)}
            >
              Löschen
            </Button>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default StandardMedicationForm
