import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import MedicationIcon from '@mui/icons-material/Medication'
import PetsIcon from '@mui/icons-material/Pets'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Home = () => (
  <Container maxWidth="sm" sx={{ mt: 6 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        MediTrackApp
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        Willkommen zur Startseite deiner persönlichen Medikationstracking-App.
        Wähle einen Bereich:
      </Typography>

      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/onboarding">
              <ListItemIcon><RocketLaunchIcon /></ListItemIcon>
              <ListItemText primary=" Onboarding starten" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/standard-medication">
              <ListItemIcon><MedicationIcon /></ListItemIcon>
              <ListItemText primary=" Standard-Medikamente" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/medication-history">
              <ListItemIcon><MedicationIcon /></ListItemIcon>
              <ListItemText primary=" Medikamentenhistorie" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/medication-stats">
              <ListItemIcon><MedicationIcon /></ListItemIcon>
              <ListItemText primary=" MedikamentenStatistik" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary=" Profil" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  </Container>
)

export default Home
