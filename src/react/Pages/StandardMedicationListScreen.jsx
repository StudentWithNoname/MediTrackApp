import React from 'react'
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

import { useOnboarding } from '../Context/OnboardingContext'

const StandardMedicationListScreen = ({ onScrollToForm }) => {
  const { userData, setUserData } = useOnboarding()
  const medications = userData.medications || []

  const handleDelete = (index) => {
    const updated = [...medications]
    updated.splice(index, 1)
    setUserData((prev) => ({
      ...prev,
      medications: updated
    }))
  }

  const handleClearAll = () => {
    setUserData((prev) => ({ ...prev, medications: [] }))
  }

  return (
    <Box sx={{ padding: 4, maxWidth: { xs: '90%', sm: 600 }, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Gespeicherte Medikamente
      </Typography>

      {medications.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Es wurden noch keine Medikamente eingetragen.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onScrollToForm}
          >
            Medikation hinzufügen
          </Button>
        </Box>
      ) : (
        <>
          <Paper elevation={3}>
            <List>
              {medications.map((med, index) => (
                <React.Fragment key={med.id || index}>
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="text"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(index)}
                      >
                        Löschen
                      </Button>
                    }
                  >
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

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="outlined" color="error" onClick={handleClearAll}>
              Alle löschen
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default StandardMedicationListScreen
