import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../Context/OnboardingContext'
import MedicationIntakeReminder from '../Components/MedicationIntakeReminder'

// Icons
import MedicationIcon from '@mui/icons-material/Medication'
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import ReportIcon from '@mui/icons-material/Report'

const tiles = [
  {
    label: 'Standard-Medikation',
    icon: <MedicationIcon fontSize="large" />,
    description: 'Regelmäßige Medikamente verwalten',
    route: '/standard-medication',
    color: '#1976d2'
  },
  {
    label: 'Bedarfsmedikation',
    icon: <EmergencyRecordingIcon fontSize="large" />,
    description: 'Medikamente bei Bedarf erfassen',
    route: '/extra-medication',
    color: '#388e3c'
  },
  {
    label: 'Verlauf',
    icon: <CalendarMonthIcon fontSize="large" />,
    description: 'Einnahmehistorie einsehen',
    route: '/medication-history',
    color: '#f57c00'
  },
  {
    label: 'Statistik',
    icon: <BarChartIcon fontSize="large" />,
    description: 'Trends & Auswertung',
    route: '/medication-stats',
    color: '#7b1fa2'
  },
  {
    label: 'Export',
    icon: <DescriptionIcon fontSize="large" />,
    description: 'PDF-Übersicht exportieren',
    route: '/medikation-export',
    color: '#455a64'
  },
  {
    label: 'Beschwerden',
    icon: <ReportIcon fontSize="large" />,
    description: 'Feedback nach Bedarfsmedikation',
    route: '/complaints',
    color: '#c2185b'
  }
]

const Dashboard = () => {
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const profile = userData?.profile || {}
  const name = profile.name || ''
  const age = profile.age || ''
  const goals = profile.goals || {}

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        {name
          ? `Willkommen zurück, ${name}${age ? ` (${age} Jahre)` : ''}!`
          : 'Willkommen im MediTrack-Dashboard'}
      </Typography>

      {goals.medicationAdherence && (
        <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
          Ziel: {goals.medicationAdherence}% Einnahmequote täglich
        </Typography>
      )}
      {goals.dailyIntake && (
        <Typography variant="body2" textAlign="center">
          Ziel: {goals.dailyIntake} Einnahmen pro Tag
        </Typography>
      )}
      {goals.customNote && (
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ fontStyle: 'italic' }}
          color="text.secondary"
        >
          Hinweis: {goals.customNote}
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {tiles.map((tile, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: tile.color,
                color: '#fff',
                height: 180,
                borderRadius: 2,
                boxShadow: 4
              }}
            >
              <CardActionArea onClick={() => navigate(tile.route)}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  {tile.icon}
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {tile.label}
                  </Typography>
                  <Typography variant="body2">{tile.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <MedicationIntakeReminder />
      </Box>
    </Box>
  )
}

export default Dashboard
