import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Onboarding from './Pages/Onboarding'
import StandardMedicationScreen from './Pages/StandardMedicationScreen'
import StandardMedicationDetailScreen from './Pages/StandardMedicationDetailScreen'
import ExtraMedicationScreen from './Pages/ExtraMedicationScreen'
import CatNames from './Pages/CatNames/CatNames'
import Profile from './Pages/Profile/Profile'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'
import Dashboard from './Pages/Dashboard'
import MedicationIntakeReminder from './Components/MedicationIntakeReminder'
import ExportMedicationOverview from './Components/ExportMedicationOverview'
import Error404 from './Pages/Error404'
import MedicationHistory from './Components/MedicationHistory'
import MedicationStats from './Components/MedicationStats'
import ComplaintPage from './Pages/ComplaintPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/standard-medication" element={<StandardMedicationScreen />} />
    <Route path="/standard-medication/:id" element={<StandardMedicationDetailScreen />} />

    <Route path="/extra-medication" element={<ExtraMedicationScreen />} />
    <Route path="/medikation-export" element={<ExportMedicationOverview />} />
    <Route path="/medication-history" element={<MedicationHistory />} />
    <Route path="/medication-stats" element={<MedicationStats />} />

    <Route path="/catnames" element={<CatNames />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/overview" element={<ProfileOverview />} />
    <Route path="/profile/settings" element={<ProfileSettings />} />
    <Route path="/complaints" element={<ComplaintPage />} />

    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
