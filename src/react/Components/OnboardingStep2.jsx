import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useOnboarding } from '../Context/OnboardingContext'

const OnboardingStep2 = ({ onBack, onNext }) => {
  const { userData, setUserData } = useOnboarding()
  const [medication, setMedication] = useState({ name: '', dosage: '' })

  const handleAdd = () => {
    if (medication.name.trim() !== '') {
      const newEntry = {
        name: medication.name.trim(),
        dosage: medication.dosage.trim()
      }
      setUserData((prev) => ({
        ...prev,
        medications: [...(prev.medications || []), newEntry]
      }))
      setMedication({ name: '', dosage: '' })
    }
  }

  return (
    <div>
      <h2>💊 Medikamente hinzufügen</h2>

      <label htmlFor="medName">Medikament *</label>
      <input
        id="medName"
        value={medication.name}
        onChange={(e) => setMedication({ ...medication, name: e.target.value })}
      />

      <label htmlFor="dosage">Dosierung</label>
      <input
        id="dosage"
        value={medication.dosage}
        onChange={(e) => setMedication({ ...medication, dosage: e.target.value })}
      />

      <button type="button" onClick={handleAdd}>Hinzufügen</button>

      <ul>
        {(userData.medications || []).map((m, i) => (
          <li key={`${m.name}-${i}`}>
            {m.name} ({m.dosage})
          </li>
        ))}
      </ul>

      <button onClick={onBack}>← Zurück</button>
      <button onClick={onNext} disabled={!userData.medications?.length}>Weiter →</button>
    </div>
  )
}

OnboardingStep2.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default OnboardingStep2
