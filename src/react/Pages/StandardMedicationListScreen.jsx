import React from 'react'
import { useOnboarding } from '../Context/OnboardingContext'
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from '@mui/material'

const StandardMedicationListScreen = () => {
const { userData, setUserData } = useOnboarding()
console.log('StandardMedicationListScreen → userData:', userData)
const medications = userData.medications || []


  const handleClearAll = () => {
    setUserData((prev) => ({ ...prev, medications: [] }))
  }

  return (
    <Box sx={{ padding: 4, maxWidth: { xs: '90%', sm: 600 }, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Gespeicherte Medikamente
      </Typography>

      {medications.length === 0 ? (
        <Typography variant="body1">Keine Einträge vorhanden.</Typography>
      ) : (
        <Paper elevation={3}>
          <List>
            {medications.map((med, index) => (
              <React.Fragment key={med.id || index}>
                <ListItem>
                  <ListItemText
                    primary={`${med.name} – ${med.dosage}`}
                    secondary={`${med.frequency || '–'}× täglich`}
                  />
                </ListItem>
                {index < medications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {medications.length > 0 && (
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button variant="outlined" color="error" onClick={handleClearAll}>
            Alle löschen
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default StandardMedicationListScreen
