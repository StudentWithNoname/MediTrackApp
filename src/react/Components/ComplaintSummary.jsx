import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const ComplaintSummary = () => {
  const [summary, setSummary] = useState({})

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem('feedbackAfterExtraMed')) || []
    const counts = {}

    feedbacks.forEach((entry) => {
      const name = entry.name
      counts[name] = (counts[name] || 0) + 1
    })

    setSummary(counts)
  }, [])

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" gutterBottom>
        Beschwerden pro Bedarfsmedikament
      </Typography>
      {Object.keys(summary).length === 0 ? (
        <Typography variant="body2">Noch keine Rückmeldungen vorhanden.</Typography>
      ) : (
        Object.entries(summary).map(([name, count], i) => (
          <Typography key={i} variant="body2">
            • {name}: {count} Rückmeldung{count > 1 ? 'en' : ''}
          </Typography>
        ))
      )}
    </Box>
  )
}

export default ComplaintSummary
