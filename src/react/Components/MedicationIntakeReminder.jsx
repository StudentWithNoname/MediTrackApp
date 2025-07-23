import React, { useEffect, useState, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'
import { useOnboarding } from '../Context/OnboardingContext'

const MedicationIntakeReminder = ({ delay = 10000, snooze = 5000 }) => {
  const { userData } = useOnboarding()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef(null)

  const medications = userData.medications || []
  const med = medications.length > 0 ? medications[0] : null

  const scheduleReminder = (customDelay) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (!dismissed && med) setOpen(true)
    }, customDelay)
  }

  useEffect(() => {
    scheduleReminder(delay)
    return () => clearTimeout(timerRef.current)
  }, [delay, med])

  const handleConfirm = () => {
    setOpen(false)
    setDismissed(true)
    console.log(`confirmed: ${med?.name}`)
  }

  const handleWillNotTake = () => {
    setOpen(false)
    console.log(`cancelled: ${med?.name}`)
  }

  const handleSnooze = () => {
    setOpen(false)
    scheduleReminder(snooze)
    console.log(`snoozed: ${med?.name}`)
  }

  if (!med) return null

  return (
    <Dialog open={open} onClose={handleWillNotTake}>
      <DialogTitle>Erinnerung</DialogTitle>
      <DialogContent>
        <Typography>
          Hast du {med.name} ({med.dosage}) heute schon eingenommen?
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Frequenz: {med.frequency}× täglich
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="success" variant="contained">
          Ja
        </Button>
        <Button onClick={handleSnooze} color="primary">
          Später erinnern
        </Button>
        <Button onClick={handleWillNotTake} color="warning">
          Überspringen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MedicationIntakeReminder
