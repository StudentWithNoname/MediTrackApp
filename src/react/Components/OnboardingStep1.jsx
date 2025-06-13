import React, { useState } from 'react'

const OnboardingStep1 = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [touched, setTouched] = useState({ name: false, age: false })

  const isValid = name.trim() !== '' && age.trim() !== ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    console.log(`Willkommen, ${name} (${age})`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>👋 Willkommen bei Meditrack</h2>

      <div>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        />
        {touched.name && name.trim() === '' && (
          <p style={{ color: 'red' }}>Bitte gib deinen Namen ein</p>
        )}
      </div>

      <div>
        <label htmlFor="age">Alter *</label>
        <input
          id="age"
          name="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, age: true }))}
        />
        {touched.age && age.trim() === '' && (
          <p style={{ color: 'red' }}>Bitte gib dein Alter ein</p>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Weiter →
      </button>
    </form>
  )
}

export default OnboardingStep1
