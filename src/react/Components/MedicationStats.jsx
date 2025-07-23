import React from 'react'
import { useOnboarding } from '../Context/OnboardingContext'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper
} from '@mui/material'

const MedicationStats = () => {
  const { userData } = useOnboarding()
  const history = userData.medicationHistory || []

  if (history.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Statistik zur Einnahme
        </Typography>
        <Typography>Es liegen noch keine Daten zur Einnahme vor.</Typography>
      </Box>
    )
  }

  const groupedStats = history.reduce((acc, entry) => {
    if (!acc[entry.name]) {
      acc[entry.name] = { confirmed: 0, skipped: 0, snoozed: 0 }
    }
    acc[entry.name][entry.action]++
    return acc
  }, {})

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Statistik zur Einnahme
      </Typography>

      {Object.entries(groupedStats).map(([medName, actions]) => (
        <Paper key={medName} sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>{medName}</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Bestätigt`} secondary={`${actions.confirmed}×`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Übersprungen`} secondary={`${actions.skipped}×`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Verschoben (Snooze)`} secondary={`${actions.snoozed}×`} />
            </ListItem>
          </List>
          <Divider />
        </Paper>
      ))}
    </Box>
  )
}

export default MedicationStats
