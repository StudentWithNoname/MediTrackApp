import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button, Paper } from '@mui/material'

const MedicationOverviewScreen = ({ pdfContent, fileName = 'Bericht.pdf' }) => {
  const handleDownload = () => {
    const blob = new Blob([pdfContent], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: {
          xs: '90%',
          sm: 600
        },
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Medikamentenübersicht
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
        <Typography variant="body1" gutterBottom>
          Klicken Sie auf den Button, um das PDF herunterzuladen.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </Paper>
    </Box>
  )
}

MedicationOverviewScreen.propTypes = {
  pdfContent: PropTypes.instanceOf(Blob),
  fileName: PropTypes.string
}

export default MedicationOverviewScreen
