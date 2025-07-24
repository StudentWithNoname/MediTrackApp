import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Onboarding from './Pages/Onboarding'
import StandardMedicationListScreen from './Pages/StandardMedicationListScreen'
import StandardMedicationScreen from './Pages/StandardMedicationScreen'
import ExtraMedicationScreen from './Pages/ExtraMedicationScreen'
import CatNames from './Pages/CatNames/CatNames'
import Profile from './Pages/Profile/Profile'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'
import Dashboard from './Pages/Dashboard'
import MedicationIntakeReminder from './Components/MedicationIntakeReminder' // korrekt als Komponente
import Error404 from './Pages/Error404'
import StandardMedicationDetailScreen from './Pages/StandardMedicationDetailScreen'
import MedicationHistory from './Components/MedicationHistory'
import MedicationStats from './Components/MedicationStats'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/standard-medication" element={<StandardMedicationListScreen />} />
    <Route path="/standard-medication/:id" element={<StandardMedicationScreen />} />
    <Route path="/extra-medication" element={<ExtraMedicationScreen />} />
    <Route path="/catnames" element={<CatNames />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/overview" element={<ProfileOverview />} />
    <Route path="/profile/settings" element={<ProfileSettings />} />
    {/*  reminder bleibt nur */}
    <Route path="*" element={<Error404 />} />
    <Route path="/standard-medication/:id" element={<StandardMedicationDetailScreen />} />
    <Route path="/medication-history" element={<MedicationHistory />} />
    <Route path="/medication-stats" element={<MedicationStats />} />
  </Routes>
)

export default AppRoutes
