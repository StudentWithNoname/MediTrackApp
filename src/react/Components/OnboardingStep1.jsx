import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const OnboardingStep1 = ({ onNext }) => {
  const { userData, setUserData } = useOnboarding()
  const [touched, setTouched] = useState({ name: false, age: false })

  const isValid = userData.name.trim() !== '' && userData.age.trim() !== ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onNext()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        👋 Willkommen bei Meditrack
      </Typography>

      <TextField
        label="Name *"
        name="name"
        fullWidth
        margin="normal"
        value={userData.name}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        error={touched.name && userData.name.trim() === ''}
        helperText={touched.name && userData.name.trim() === '' ? 'Bitte gib deinen Namen ein' : ''}
      />

      <TextField
        label="Alter *"
        name="age"
        type="number"
        fullWidth
        margin="normal"
        value={userData.age}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, age: true }))}
        error={touched.age && userData.age.trim() === ''}
        helperText={touched.age && userData.age.trim() === '' ? 'Bitte gib dein Alter ein' : ''}
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
