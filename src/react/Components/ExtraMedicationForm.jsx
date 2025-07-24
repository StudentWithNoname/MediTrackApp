import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Typography,
  Alert
} from '@mui/material'

import interactionData from '../../data/med_interactions_full_50.json'

const ExtraMedicationForm = () => {
  const [availableExtraMeds, setAvailableExtraMeds] = useState([])
  const [standardMeds, setStandardMeds] = useState([])
  const [selectedMedication, setSelectedMedication] = useState('')
  const [reason, setReason] = useState('')
  const [interaction, setInteraction] = useState(null)
  const [extraMeds, setExtraMeds] = useState([])

  useEffect(() => {
    const uniqueDrug2 = Array.from(new Set(interactionData.map((d) => d.drug2)))
    setAvailableExtraMeds(uniqueDrug2)
  }, [])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('standardMedications')) || []
    const names = stored.map((m) => m.name)
    setStandardMeds(names)
  }, [])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('extraMedications')) || []
    setExtraMeds(stored)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMedication || !reason) return

    const match = interactionData.find((entry) => standardMeds.some(
      (med) => med.toLowerCase() === entry.drug1.toLowerCase() &&
               entry.drug2.toLowerCase() === selectedMedication.toLowerCase()
    ))
    setInteraction(match || null)

    const newEntry = { name: selectedMedication, reason }
    const updated = [...extraMeds, newEntry]
    localStorage.setItem('extraMedications', JSON.stringify(updated))
    setExtraMeds(updated)

    setSelectedMedication('')
    setReason('')
  }

  const handleDelete = (index) => {
    const updated = [...extraMeds]
    updated.splice(index, 1)
    localStorage.setItem('extraMedications', JSON.stringify(updated))
    setExtraMeds(updated)
  }

  const getSeverityColor = (severity) => {
    if (severity === 'Major') return 'error'
    if (severity === 'Moderate') return 'warning'
    return 'info'
  }

  return (
    <Box component="form" onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4
      }}
    >
      <Typography variant="h5" gutterBottom>
        Bedarfsmedikation hinzufügen
      </Typography>

      <FormControl fullWidth required>
        <InputLabel>Medikament</InputLabel>
        <Select
          value={selectedMedication}
          onChange={(e) => setSelectedMedication(e.target.value)}
          label="Medikament"
        >
          {availableExtraMeds.map((med) => (
            <MenuItem key={med} value={med}>
              {med}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Grund der Einnahme"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="z. B. Kopfschmerzen"
        required
        fullWidth
      />

      <Button variant="contained" color="primary" type="submit">
        Speichern
      </Button>

      {interaction && (
        <Alert severity={getSeverityColor(interaction.severity)}>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Wechselwirkung gefunden:</strong>
          </Typography>
          <Typography variant="body2">
            <em>{interaction.drug1}</em> + <em>{interaction.drug2}</em>
          </Typography>
          <Typography variant="body2"><strong>Schweregrad:</strong><br />{interaction.severity}</Typography>
          <Typography variant="body2"><strong>Mechanismus:</strong><br />{interaction.mechanism_de}</Typography>
          <Typography variant="body2"><strong>Empfehlung:</strong><br />{interaction.management_de}</Typography>
        </Alert>
      )}

      {extraMeds.map((med, index) => (
        <Box key={index} sx={{ mt: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography><strong>Medikament:</strong> {med.name}</Typography>
          <Typography><strong>Grund:</strong> {med.reason}</Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => handleDelete(index)}
          >
            Löschen
          </Button>
        </Box>
      ))}
    </Box>
  )
}

export default ExtraMedicationForm
