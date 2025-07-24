import React from 'react'
import StandardMedicationForm from '../Components/StandardMedicationForm'
import StandardMedicationListScreen from './StandardMedicationListScreen'

const StandardMedicationScreen = () => {
  const handleScrollToForm = () => {
    setTimeout(() => {
      const target = document.getElementById('standard-med-form')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div>
      <StandardMedicationForm />
      <StandardMedicationListScreen onScrollToForm={handleScrollToForm} />
    </div>
  )
}

export default StandardMedicationScreen
