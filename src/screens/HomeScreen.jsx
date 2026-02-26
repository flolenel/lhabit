import { useState, useEffect } from 'react'
import profiles from '../data/profiles.json'

const allJobs = [
  ...new Set(profiles.map(p => p.metier_femme))
]

export default function HomeScreen({ record, onPlay }) {
  const [jobIndex, setJobIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setJobIndex(i => (i + 1) % allJobs.length)
        setFade(true)
      }, 300)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-screen">
      {/* Scrolling blurred background */}
      <div className="home-bg" aria-hidden="true">
        <div className="home-bg__track">
          {[...profiles, ...profiles].map((p, i) => (
            <img
              key={i}
              src={p.photo}
              alt=""
              className="home-bg__photo"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="home-content">
        <div className="home-logo">💼</div>

        <h1 className="home-title">
          L&apos;HABIT NE FAIT PAS LE
          <br />
          <span className={`home-title__job ${fade ? 'home-title__job--visible' : 'home-title__job--hidden'}`}>
            {allJobs[jobIndex].toUpperCase()}
          </span>
        </h1>

        <p className="home-subtitle">
          Sauras-tu deviner le métier de ces profils LinkedIn ?
        </p>

        <button className="btn-primary" onClick={onPlay}>
          JOUER
        </button>

        {record > 0 && (
          <p className="home-record">
            🏆 Votre record : <strong>{record}</strong>
          </p>
        )}

        <p className="home-hint">
          Fais le plus long streak possible sans te faire renvoyer.
        </p>
      </div>
    </div>
  )
}
