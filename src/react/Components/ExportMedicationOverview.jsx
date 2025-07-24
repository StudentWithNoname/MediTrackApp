import React, { useEffect, useState } from 'react'
import { jsPDF as JsPDF } from 'jspdf'
import { useOnboarding } from '../Context/OnboardingContext'
import MedicationOverviewScreen from '../Pages/MedicationOverviewScreen'

const ExportMedicationOverview = () => {
  const { userData } = useOnboarding()
  const [pdfContent, setPdfContent] = useState(undefined)

  const profile = userData?.profile || {}
  const name = profile.name || 'Benutzer'
  const age = profile.age || '–'
  const fileName = `${name}_Medikation.pdf`

  useEffect(() => {
    const doc = new JsPDF()

    doc.setFontSize(18)
    doc.text('Medikamentenübersicht', 20, 20)

    doc.setFontSize(12)
    doc.text(`Name: ${name}`, 20, 40)
    doc.text(`Alter: ${age} Jahre`, 20, 50)

    const standardMeds = userData.medications || []
    doc.text('Standard-Medikationen:', 20, 70)
    standardMeds.forEach((med, index) => {
      const text = `${index + 1}. ${med.name} – ${med.dosage || ''} (${med.frequency || '–'}× täglich)`
      doc.text(text, 25, 80 + index * 10)
    })

    let yOffset = 80 + standardMeds.length * 10 + 20

    const extraMeds = JSON.parse(localStorage.getItem('extraMedications') || '[]')
    if (extraMeds.length > 0) {
      doc.text('Bedarfsmedikationen:', 20, yOffset)
      extraMeds.forEach((med, index) => {
        const text = `${index + 1}. ${med.name} – Grund: ${med.reason}`
        doc.text(text, 25, yOffset + 10 + index * 10)
      })
      yOffset += 10 + extraMeds.length * 10 + 20
    }

    // NEU: Beschwerden/Feedback anzeigen
    const feedbackList = JSON.parse(localStorage.getItem('feedbackAfterExtraMed') || '[]')
    if (feedbackList.length > 0) {
      doc.text('Rückmeldung nach Einnahme:', 20, yOffset)
      feedbackList.slice().reverse().forEach((entry, index) => {
        const date = new Date(entry.date).toLocaleDateString()
        doc.text(`${index + 1}. ${entry.name} am ${date}`, 25, yOffset + 10 + index * 20)
        doc.text(`→ ${entry.note}`, 28, yOffset + 16 + index * 20)
      })
    }

    const pdfBlob = doc.output('blob')
    setPdfContent(pdfBlob)
  }, [])

  return (
    <MedicationOverviewScreen pdfContent={pdfContent} fileName={fileName} />
  )
}

export default ExportMedicationOverview
