import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const MedicationChartLight = () => {
  const { userData } = useOnboarding()
  const history = userData.medicationHistory || []

  const confirmedByDate = history
    .filter(entry => entry.action === 'confirmed')
    .reduce((acc, entry) => {
      const dateKey = new Date(entry.timestamp).toLocaleDateString()
      acc[dateKey] = (acc[dateKey] || 0) + 1
      return acc
    }, {})

  const rows = Object.entries(confirmedByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  if (rows.length === 0) return null

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Einnahmen pro Tag (nur bestätigt)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Bestätigte Einnahmen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MedicationChartLight
