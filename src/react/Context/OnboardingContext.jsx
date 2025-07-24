import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// 1️⃣ Context erzeugen
const OnboardingContext = createContext()

// 2️⃣ Provider-Komponente
export const OnboardingProvider = ({ children }) => {
  // Daten aus localStorage laden, falls vorhanden
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData')
    return stored
      ? JSON.parse(stored)
      : {
        name: '',
        age: '',
        medications: [],
        goals: []
      }
  })

  // bei jeder Änderung automatisch speichern
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  return (
    <OnboardingContext.Provider value={{ userData, setUserData }}>
      {children}
    </OnboardingContext.Provider>
  )
}

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// 3️⃣ Custom Hook zum Verwenden
export const useOnboarding = () => useContext(OnboardingContext)
