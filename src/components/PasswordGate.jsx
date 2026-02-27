import { useState } from 'react'

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === 'flonflon') {
      onUnlock()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="password-gate">
      <img src="/logo.png" alt="Logo" className="password-gate__logo" />
      <form className="password-gate__form" onSubmit={handleSubmit}>
        <input
          className={`password-gate__input ${error ? 'password-gate__input--error' : ''}`}
          type="password"
          placeholder="Mot de passe"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          autoFocus
        />
        {error && (
          <p className="password-gate__error">Mot de passe incorrect</p>
        )}
        <button className="password-gate__btn" type="submit">
          Entrer
        </button>
      </form>
    </div>
  )
}
