import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import OnboardingContainer from './Containers/OnboardingContainer'
import { OnboardingProvider } from './Context/OnboardingContext'

console.log('✅ App.jsx wird geladen')

function App() {
  return (
    <OnboardingProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {console.log('🏠 Route / wird angezeigt')}
                <Home />
              </>
            }
          />
          <Route
            path="/onboarding"
            element={
              <>
                {console.log('🧭 Route /onboarding wird angezeigt')}
                <OnboardingContainer />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </OnboardingProvider>
  )
}

// ⬇️ ⬇️ ⬇️ Das hier war bisher nicht vorhanden – und ist entscheidend!
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
