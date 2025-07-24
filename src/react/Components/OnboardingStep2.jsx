import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert
} from '@mui/material'

import PropTypes from 'prop-types'
import { useOnboarding } from '../Context/OnboardingContext'
import StandardMedicationForm from './StandardMedicationForm'

const OnboardingStep2 = ({ onBack, onNext }) => {
  const { userData } = useOnboarding()

  const canProceed = userData.medications && userData.medications.length > 0

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        🩺 Schritt 2: Deine Medikation
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Wähle Medikamente aus unserer Liste. Du kannst später weitere hinzufügen.
      </Typography>

      <StandardMedicationForm />

      {canProceed ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Ausgewählt:</Typography>
          <List>
            {userData.medications.map((med) => (
              <ListItem key={med.id}>
                <ListItemText
                  primary={`${med.name} – ${med.dosage}`}
                  secondary={`${med.frequency}× täglich`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Alert severity="info" sx={{ mt: 4 }}>
          Du hast noch keine Medikamente ausgewählt.
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="outlined" onClick={onBack}>
          Zurück
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!canProceed}
        >
          Weiter
        </Button>
      </Box>
    </Box>
  )
}

OnboardingStep2.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default OnboardingStep2
