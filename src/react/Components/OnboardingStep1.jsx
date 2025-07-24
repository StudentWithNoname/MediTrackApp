import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const OnboardingStep1 = ({ onNext }) => {
  const { userData, setUserData } = useOnboarding()
  const [touched, setTouched] = useState({ name: false, age: false })

  // Zugriff auf Profildaten (falls vorhanden)
  const profile = userData.profile || {}
  const name = profile.name || ''
  const age = profile.age || ''

  // Felder gültig?
  const isValid = name.trim() !== '' && age.trim() !== ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        [name]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onNext()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        👋 Willkommen bei MediTrack
      </Typography>

      <TextField
        label="Name *"
        name="name"
        fullWidth
        margin="normal"
        value={name}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        error={touched.name && name.trim() === ''}
        helperText={touched.name && name.trim() === '' ? 'Bitte gib deinen Namen ein' : ''}
      />

      <TextField
        label="Alter *"
        name="age"
        type="number"
        fullWidth
        margin="normal"
        value={age}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, age: true }))}
        error={touched.age && age.trim() === ''}
        helperText={touched.age && age.trim() === '' ? 'Bitte gib dein Alter ein' : ''}
      />

      <Button variant="contained" type="submit" fullWidth disabled={!isValid} sx={{ mt: 2 }}>
        Weiter →
      </Button>
    </Box>
  )
}

OnboardingStep1.propTypes = {
  onNext: PropTypes.func.isRequired
}

export default OnboardingStep1
