import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import CatNames from './Pages/CatNames/CatNames'
import Profile from './Pages/Profile/Profile'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'
import Error404 from './Pages/Error404'

// ➕ Meditrack-Pages
import Onboarding from './Pages/Onboarding'
import MedicationIntakeReminder from './Components/MedicationIntakeReminder'

const AppRoutes = () => (
  <Routes>
    {/* Startseite (kannst du auf Onboarding legen, falls gewünscht) */}
    <Route
      path="/"
      element={
        <>
          <Home />
          <MedicationIntakeReminder delay={5000} snooze={10000} />
        </>
      }
    />

    {/* Bestehende Profile-Routen */}
    <Route path="/profile" element={<Profile />}>
      <Route path="" element={<ProfileOverview />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Route>

    {/* Beispielroute aus Vorlage */}
    <Route path="/catnames" element={<CatNames />} />

    {/* ➕ Neue Meditrack-Routen */}
    <Route path="/onboarding" element={<Onboarding />} />

    {/* Fallback für nicht gefundene Routen */}
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
