import { useState, useEffect, useRef } from 'react'

export default function StatusBar({ status, score, celebrate, celebrateKey }) {
  const [showing, setShowing] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (celebrate) {
      setShowing(true)
      clearTimeout(timerRef.current)
      // Animation 1.1s + délai max 0.1s + petite marge = 1.3s
      timerRef.current = setTimeout(() => setShowing(false), 1300)
    }
    return () => clearTimeout(timerRef.current)
  }, [celebrate, celebrateKey])

  return (
    <>
      {/* Statut — centré dans la topbar */}
      <div className="status-center">
        {showing && (
          <div key={celebrateKey} className="confetti-burst" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span key={i} className={`confetti-particle confetti-particle--${i + 1}`} />
            ))}
          </div>
        )}
        <span className="status-center__label">VOUS ÊTES UN SUPER</span>
        <span className="status-center__value">{status}</span>
      </div>

      {/* Score — à droite */}
      <div className="score-block">
        <span className="score-block__label">SCORE</span>
        <span className="score-block__value">{score}</span>
      </div>
    </>
  );
}
