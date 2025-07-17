import React, { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import DownloadPdfScreen from '../Pages/DownloadPdfScreen'

const ExportMedicationOverview = () => {
  const [pdfContent, setPdfContent] = useState(null)
  const fileName = 'Max_Mustermann_Medikation.pdf'

  useEffect(() => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Medikamentenübersicht', 20, 20)

    // die Daten hir müssen aus dem Medikamentenübersicht übernommen und ersetzt werden
    doc.setFontSize(12)
    doc.text('Name: Max Mustermann', 20, 40)
    doc.text('Alter: 65', 20, 50)

    const medications = [
      { name: 'Aspirin', time: '08:00 Uhr', day: 'jeden Tag' },
      { name: 'Paracetamol', time: '20:00 Uhr', day: 'Montag und Mittwoch' }
    ]

    doc.text('Medikationen:', 20, 70)
    medications.forEach((med, index) => {
      doc.text(
        `${index + 1}. ${med.name} - ${med.time} ( ${med.day} )`,
        25,
        80 + index * 10
      )
    })

    const pdfBlob = doc.output('blob')
    setPdfContent(pdfBlob)
  }, [])

  return (
    <DownloadPdfScreen pdfContent={pdfContent} fileName={fileName} />
  )
}

export default ExportMedicationOverview
