import React from 'react'
import { useOnboarding } from '../Context/OnboardingContext'
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Button,
  Divider
} from '@mui/material'
import MedicationIntakeReminder from '../Components/MedicationIntakeReminder'
import MedicationChartLight from '../Components/MedicationChartLight'
import MedicationStats from '../Components/MedicationStats'

const Dashboard = () => {
  const { userData } = useOnboarding()

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        👋 Willkommen, {userData.name || 'Benutzer'}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Alter: {userData.age || 'Nicht angegeben'}
      </Typography>

      <Grid container spacing={3}>
        {/* Ziele */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">🎯 Deine Ziele</Typography>
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
        </Grid>

        {/* Standard-Medikationen */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">💊 Standard-Medikationen</Typography>
              <List>
                {(userData.medications || []).map((med, i) => (
                  <ListItem key={med.id || i}>
                    <ListItemText
                      primary={`${med.name} – ${med.dosage}`}
                      secondary={`${med.frequency || '–'}× täglich`}
                    />
                  </ListItem>
                ))}
                {(!userData.medications || userData.medications.length === 0) && (
                  <Typography color="text.secondary" sx={{ mt: 2 }}>
                    Keine Medikation eingetragen.
                  </Typography>
                )}
              </List>

              <Divider sx={{ mt: 2 }} />
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                href="/standard-medication"
              >
                Bearbeiten
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Reminder */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">🔔 Erinnerung</Typography>
              <MedicationIntakeReminder delay={8000} snooze={5000} />
            </CardContent>
          </Card>
        </Grid>

        {/* Statistik */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">📋 Einnahmestatistik</Typography>
              <MedicationStats />
            </CardContent>
          </Card>
        </Grid>

        {/* Einnahmeverlauf */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">📊 Einnahmeverlauf</Typography>
              <MedicationChartLight />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
