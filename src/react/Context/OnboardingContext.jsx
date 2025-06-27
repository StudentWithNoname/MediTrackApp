import React, { createContext, useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

const OnboardingContext = createContext()

export const OnboardingProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    medications: []
  })

  const value = useMemo(() => ({ userData, setUserData }), [userData])

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useOnboarding = () => useContext(OnboardingContext)
