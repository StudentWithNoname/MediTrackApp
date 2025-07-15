import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useOnboarding } from '../Context/OnboardingContext'

const OnboardingStep1 = ({ onNext }) => {
  const { userData, setUserData } = useOnboarding()
  const [touched, setTouched] = useState({ name: false, age: false })

  // ⬇️ Logging zur Prüfung, ob Context verfügbar ist
  console.log('[Step1] userData:', userData)

  const isValid = userData.name.trim() !== '' && userData.age.trim() !== ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>👋 Willkommen bei Meditrack</h2>

      <label htmlFor="name">Name *</label>
      <input
        id="name"
        name="name"
        type="text"
        value={userData.name}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
      />
      {touched.name && userData.name.trim() === '' && (
        <p style={{ color: 'red' }}>Bitte gib deinen Namen ein</p>
      )}

      <label htmlFor="age">Alter *</label>
      <input
        id="age"
        name="age"
        type="number"
        value={userData.age}
        onChange={handleChange}
        onBlur={() => setTouched((t) => ({ ...t, age: true }))}
      />
      {touched.age && userData.age.trim() === '' && (
        <p style={{ color: 'red' }}>Bitte gib dein Alter ein</p>
      )}

      <button type="submit" disabled={!isValid}>
        Weiter →
      </button>
    </form>
  )
}

OnboardingStep1.propTypes = {
  onNext: PropTypes.func.isRequired
}

export default OnboardingStep1
