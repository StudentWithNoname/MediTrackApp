import React from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Divider,
  Box,
  useTheme,
  Tooltip
} from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'
import MedicationIntakeReminder from '../Components/MedicationIntakeReminder'
import MedicationChartLight from '../Components/MedicationChartLight'
import MedicationStats from '../Components/MedicationStats'
import MedicationIcon from '@mui/icons-material/Medication'
import TimelineIcon from '@mui/icons-material/Timeline'
import ChecklistIcon from '@mui/icons-material/Checklist'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

const Dashboard = () => {
  const { userData } = useOnboarding()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const cardStyle = {
    elevation: 2,
    borderLeft: `6px solid ${isDark ? '#90caf9' : '#1976d2'}`,
    borderRadius: 2,
    p: 2
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        👋 Willkommen, {userData.name || 'Benutzer'}!
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Alter: {userData.age || 'Nicht angegeben'}
      </Typography>

      {/* Ziele */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🎯 Deine Ziele
      </Typography>
      <Card {...cardStyle} sx={{ borderLeft: `6px solid ${isDark ? '#a5d6a7' : '#4caf50'}` }}>
        <CardContent>
          <List>
            {(userData.goals || []).map((goal, index) => (
              <ListItem key={index}>
                <ListItemText primary={goal} />
              </ListItem>
            ))}
            {(!userData.goals || userData.goals.length === 0) && (
              <Typography color="text.secondary">Keine Ziele ausgewählt.</Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Übersicht */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🩺 Übersicht
      </Typography>
      <Grid container spacing={3}>
        {/* Medikation */}
        <Grid item xs={12} sm={6} md={4}>
          <Card {...cardStyle} sx={{ borderLeft: `6px solid ${isDark ? '#90caf9' : '#1976d2'}` }}>
            <CardContent>
              <Tooltip title="Z.B. Blutdrucktabletten" arrow>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicationIcon />
                  Standard-Medikationen
                </Typography>
              </Tooltip>
              <List>
                {(userData.medications || []).map((med, i) => (
                  <ListItem key={`med-${med.id || i}`}>
                    <ListItemText
                      primary={`${med.name} – ${med.dosage}`}
                      secondary={`${med.frequency || '–'}× täglich`}
                    />
                  </ListItem>
                ))}

                {(userData.goals || []).map((goal, j) => (
                  <ListItem key={`goal-${j}`}>
                    <ListItemText primary={goal} />
                  </ListItem>
                ))}

                {(!userData.medications || userData.medications.length === 0) && (
                  <Typography color="text.secondary" sx={{ mt: 2 }}>
                    Keine Medikation eingetragen.
                  </Typography>
                )}
              </List>
              <Divider sx={{ mt: 2 }} />
              <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }} href="/standard-medication">
                Medikation bearbeiten
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Erinnerung */}
        <Grid item xs={12} sm={6} md={4}>
          <Card {...cardStyle} sx={{ borderLeft: `6px solid ${isDark ? '#ffb74d' : 'orange'}` }}>
            <CardContent>
              <Tooltip title="Erinnert dich an fällige Einnahmen" arrow>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsActiveIcon />
                  Erinnerung
                </Typography>
              </Tooltip>
              <MedicationIntakeReminder delay={8000} snooze={5000} />
            </CardContent>
          </Card>
        </Grid>

        {/* Statistik */}
        <Grid item xs={12} sm={6} md={4}>
          <Card {...cardStyle} sx={{ borderLeft: `6px solid ${isDark ? '#4db6ac' : '#26a69a'}` }}>
            <CardContent>
              <Tooltip title="Deine bisherigen Einnahmeaktionen" arrow>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ChecklistIcon />
                  Einnahmestatistik
                </Typography>
              </Tooltip>
              <MedicationStats />
            </CardContent>
          </Card>
        </Grid>

        {/* Verlauf */}
        <Grid item xs={12}>
          <Card {...cardStyle} sx={{ borderLeft: `6px solid ${isDark ? '#ce93d8' : '#ab47bc'}` }}>
            <CardContent>
              <Tooltip title="Wann du welches Medikament bestätigt hast" arrow>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimelineIcon />
                  Einnahmeverlauf
                </Typography>
              </Tooltip>
              <MedicationChartLight />
            </CardContent>
          </Card>
        </Grid>

        {/* Bedarfsmedikation */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">💡 Bedarfsmedikation</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Hier kannst du Medikamente eintragen, die du nur bei Bedarf einnimmst.
              </Typography>

              <Divider sx={{ mt: 2 }} />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} href="/extra-medication">
                Bedarfsmedikation hinzufügen
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
