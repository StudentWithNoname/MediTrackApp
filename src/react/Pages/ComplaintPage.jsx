import React from 'react'
import { Box, Typography, Container, Card } from '@mui/material'
import ExtraMedicationFeedback from '../Components/ExtraMedicationFeedback'
import ComplaintSummary from '../Components/ComplaintSummary'

const ComplaintPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Beschwerden nach Bedarfsmedikation
      </Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        <ExtraMedicationFeedback />
      </Card>

      <Card sx={{ p: 3 }}>
        <ComplaintSummary />
      </Card>
    </Container>
  )
}

export default ComplaintPage
