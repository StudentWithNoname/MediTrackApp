import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import AppHeader from './Components/AppHeader'
import { OnboardingProvider } from './Context/OnboardingContext'

const App = () => (
  <OnboardingProvider>
    <Router>
      <AppHeader />
      <AppRoutes />
    </Router>
  </OnboardingProvider>
)

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
