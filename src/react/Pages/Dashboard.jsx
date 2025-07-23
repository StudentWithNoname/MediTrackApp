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
  Divider
} from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const Dashboard = () => {
  const { userData } = useOnboarding()
  console.log('userData:', userData)

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        👋 Willkommen,
        {userData.name || 'Benutzer'}
        !
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Alter:
        {userData.age || 'Nicht angegeben'}
      </Typography>

      <Grid container spacing={3}>
        {/* Ziele */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">🎯 Deine Ziele</Typography>
              <List>
                {(userData.goals || []).map((goal) => (
                  <ListItem key={goal}>
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

        {/* Standard-Medikation */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">💊 Standard-Medikation</Typography>
              <List>
                {(userData.medications || []).map((med) => (
                  <ListItem key={med.id}>
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

        {/* Bedarfsmedikation */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">💡 Bedarfsmedikation</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Hier kannst du Medikamente eintragen, die du nur bei Bedarf einnimmst.
              </Typography>

              <Divider sx={{ mt: 2 }} />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                href="/extra-medication"
              >
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
