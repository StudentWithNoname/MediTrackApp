import React, { useEffect, useState } from 'react'
import { jsPDF as JsPDF } from 'jspdf'
import { useOnboarding } from '../Context/OnboardingContext'
import MedicationOverviewScreen from '../Pages/MedicationOverviewScreen'

const ExportMedicationOverview = () => {
  const { userData } = useOnboarding()
  const [pdfContent, setPdfContent] = useState(undefined)
  const fileName = `${userData.name || 'Benutzer'}_Medikation.pdf`

  useEffect(() => {
    const doc = new JsPDF()

    // Titel
    doc.setFontSize(18)
    doc.text('🧾 Medikamentenübersicht', 20, 20)

    // Basisdaten
    doc.setFontSize(12)
    doc.text(`Name: ${userData.name || 'Unbekannt'}`, 20, 40)
    doc.text(`Alter: ${userData.age || '–'}`, 20, 50)

    // Standard-Medikation
    const standardMeds = userData.medications || []
    doc.text('Standard-Medikationen:', 20, 70)
    standardMeds.forEach((med, index) => {
      const text = `${index + 1}. ${med.name} – ${med.dosage || ''} (${med.frequency || '–'}× täglich)`
      doc.text(text, 25, 80 + index * 10)
    })

    // Berechne Y-Position nach Standard-Meds
    let yOffset = 80 + standardMeds.length * 10 + 20

    // Extra-Medikation aus localStorage
    const extraMeds = JSON.parse(localStorage.getItem('extraMedications') || '[]')
    if (extraMeds.length > 0) {
      doc.text('Bedarfsmedikationen:', 20, yOffset)
      extraMeds.forEach((med, index) => {
        const text = `${index + 1}. ${med.name} – Grund: ${med.reason}`
        doc.text(text, 25, yOffset + 10 + index * 10)
      })
    }

    // PDF erzeugen
    const pdfBlob = doc.output('blob')
    setPdfContent(pdfBlob)
  }, [])

  return (
    <MedicationOverviewScreen pdfContent={pdfContent} fileName={fileName} />
  )
}

export default ExportMedicationOverview
