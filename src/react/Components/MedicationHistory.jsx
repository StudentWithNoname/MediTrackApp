import React, { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const MedicationHistory = () => {
  const { userData } = useOnboarding()
  const history = userData.medicationHistory || []
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const isToday = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    )
  }

  const filteredHistory = history.filter((entry) => {
    if (filter === 'all') return true
    if (filter === 'confirmed') return entry.action === 'confirmed'
    if (filter === 'today') return isToday(entry.timestamp)
    return true
  })

  if (filteredHistory.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Einnahmehistorie
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} label="Filter" onChange={handleFilterChange}>
            <MenuItem value="all">Alle</MenuItem>
            <MenuItem value="confirmed">Nur bestätigte</MenuItem>
            <MenuItem value="today">Heute</MenuItem>
          </Select>
        </FormControl>
        <Alert severity="info">Keine passenden Einträge gefunden.</Alert>
      </Box>
    )
  }

  // Gruppieren nach Medikamentname
  const grouped = filteredHistory.reduce((acc, entry) => {
    if (!acc[entry.name]) acc[entry.name] = []
    acc[entry.name].push(entry)
    return acc
  }, {})

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Einnahmehistorie
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} label="Filter" onChange={handleFilterChange}>
          <MenuItem value="all">Alle</MenuItem>
          <MenuItem value="confirmed">Nur bestätigte</MenuItem>
          <MenuItem value="today">Heute</MenuItem>
        </Select>
      </FormControl>

      {Object.entries(grouped).map(([medName, entries]) => (
        <Box key={medName} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>{medName}</Typography>
          <List>
            {entries
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((entry, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={new Date(entry.timestamp).toLocaleString()}
                    secondary={`Aktion: ${entry.action}`}
                  />
                </ListItem>
              ))}
          </List>
          <Divider />
        </Box>
      ))}
    </Box>
  )
}

export default MedicationHistory
