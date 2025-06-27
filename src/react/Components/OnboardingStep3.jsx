import React, { useState } from 'react'
import PropTypes from 'prop-types'

const GOALS = [
  'Schmerzen reduzieren',
  'Medikamente regelmäßig einnehmen',
  'Symptome verfolgen',
  'Einfach mal ausprobieren'
]

const OnboardingStep3 = ({ onBack, onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([])

  const handleToggle = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    )
  }

  const handleSubmit = () => {
    if (selectedGoals.length > 0) onNext()
  }

  return (
    <div>
      <h2>🎯 Was möchtest du mit Meditrack erreichen?</h2>

      <ul>
        {GOALS.map((goal, index) => (
          <li key={goal}>
            <input
              id={`goal-${index}`}
              type="checkbox"
              checked={selectedGoals.includes(goal)}
              onChange={() => handleToggle(goal)}
            />
            <label htmlFor={`goal-${index}`}>{goal}</label>
          </li>
        ))}
      </ul>

      {selectedGoals.length === 0 && (
        <p style={{ color: 'red' }}>Bitte wähle mindestens ein Ziel aus</p>
      )}

      <button onClick={onBack}>← Zurück</button>
      <button onClick={handleSubmit} disabled={selectedGoals.length === 0}>
        Weiter →
      </button>
    </div>
  )
}

OnboardingStep3.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default OnboardingStep3
