import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    medications: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulardaten:', formData)
    // Hier kannst du später Navigation oder Validierung ergänzen
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Alter:
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <br />
      <label>
        Medikamente:
        <textarea name="medications" value={formData.medications} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Weiter</button>
    </form>
  );
};

export default RegisterForm
