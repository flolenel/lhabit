export default function BonusRound({ bonusData, bonusSelected, onAnswer }) {
  if (!bonusData) return null

  const { phrase, profiles, correctIndex } = bonusData

  function getCardState(index) {
    if (bonusSelected === null) return 'default'
    if (index === correctIndex) return 'correct'
    if (index === bonusSelected) return 'wrong'
    return 'disabled'
  }

  return (
    <div className="bonus-round">
      <div className="bonus-round__header">
        <span className="bonus-round__badge">
          <img src="/coeur_plein.png" alt="vie" className="bonus-badge__heart" />
          MANCHE BONUS
        </span>
        <p className="bonus-round__subtitle">+1 vie si tu trouves !</p>
      </div>

      <div className="bonus-round__phrase">
        <span className="bonus-round__quote">"</span>
        {phrase}
        <span className="bonus-round__quote">"</span>
      </div>

      <p className="bonus-round__instruction">Qui est à l'origine de ce verbatim inspirant ?</p>

      <div className="bonus-round__profiles">
        {profiles.map((profile, index) => {
          const state = getCardState(index)
          return (
            <button
              key={profile.id}
              className={`bonus-profile bonus-profile--${state}`}
              onClick={() => bonusSelected === null && onAnswer(index)}
              disabled={bonusSelected !== null && state === 'disabled'}
            >
              <img
                src={profile.photo}
                alt={`Candidat ${index + 1}`}
                className="bonus-profile__photo"
              />
              {bonusSelected !== null && index === correctIndex && (
                <div className="bonus-profile__reveal">✓</div>
              )}
              {bonusSelected !== null && index === bonusSelected && index !== correctIndex && (
                <div className="bonus-profile__reveal bonus-profile__reveal--wrong">✗</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
