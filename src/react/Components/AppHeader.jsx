import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../Context/OnboardingContext'

const AppHeader = () => {
  const navigate = useNavigate()
  const { userData } = useOnboarding()
  const name = userData?.profile?.name || ''

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          MediTrack
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {name && (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Eingeloggt als: {name}
            </Typography>
          )}
          <IconButton
            color="inherit"
            onClick={() => navigate('/dashboard')}
            title="Zurück zum Dashboard"
          >
            <HomeIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
