import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Snackbar,
  Alert
} from '@mui/material'

const ExtraMedicationFeedback = () => {
  const [extraMeds, setExtraMeds] = useState([])
  const [selectedMed, setSelectedMed] = useState('')
  const [feedback, setFeedback] = useState('')
  const [open, setOpen] = useState(false)
  const [storedFeedback, setStoredFeedback] = useState([])

  useEffect(() => {
    const meds = JSON.parse(localStorage.getItem('extraMedications')) || []
    setExtraMeds(meds)

    const feedbacks = JSON.parse(localStorage.getItem('feedbackAfterExtraMed')) || []
    setStoredFeedback(feedbacks)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMed || !feedback.trim()) return

    const entry = {
      name: selectedMed,
      note: feedback.trim(),
      date: new Date().toISOString()
    }

    const updated = [...storedFeedback, entry]
    localStorage.setItem('feedbackAfterExtraMed', JSON.stringify(updated))
    setStoredFeedback(updated)
    setSelectedMed('')
    setFeedback('')
    setOpen(true)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Medikament</InputLabel>
        <Select
          value={selectedMed}
          label="Medikament"
          onChange={(e) => setSelectedMed(e.target.value)}
        >
          {extraMeds.map((m, i) => (
            <MenuItem key={i} value={m.name}>{m.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Beschwerden / Beobachtungen"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        multiline
        rows={3}
        required
        fullWidth
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Speichern
      </Button>

      {/* Anzeige gespeicherter Rückmeldungen */}
      {storedFeedback.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Frühere Rückmeldungen
          </Typography>
          {storedFeedback.slice().reverse().map((f, i) => (
            <Box key={i} sx={{ mb: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography><strong>Medikament:</strong> {f.name}</Typography>
              <Typography><strong>Datum:</strong> {new Date(f.date).toLocaleDateString()}</Typography>
              <Typography><strong>Rückmeldung:</strong> {f.note}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" onClose={() => setOpen(false)}>Feedback gespeichert.</Alert>
      </Snackbar>
    </Box>
  )
}

export default ExtraMedicationFeedback
