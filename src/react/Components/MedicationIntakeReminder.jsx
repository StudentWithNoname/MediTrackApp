import React, { useEffect, useState, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const MedicationIntakeReminder = ({ delay, snooze }) => {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef(null)

  const scheduleReminder = (customDelay) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (!dismissed) setOpen(true)
    }, customDelay)
  }

  useEffect(() => {
    scheduleReminder(delay)
    return () => clearTimeout(timerRef.current)
  }, [delay])

  const handleConfirm = () => {
    setOpen(false)
    setDismissed(true)
    console.log('confirmed')
  }

  const handleWillNotTake = () => {
    setOpen(false)
    console.log('cancelled')
  }

  const handleSnooze = () => {
    setOpen(false)
    scheduleReminder(snooze)
    console.log('snoozed')
  }

  return (
    <Dialog open={open} onClose={handleWillNotTake}>
      <DialogTitle>Erinnerung</DialogTitle>
      <DialogContent>
        <Typography>
          Hast du Paracetamol um 14:00 genommen?
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
