export default function GameOverScreen({ score, record, currentStatus, onHome }) {
  const isNewRecord = score > 0 && score >= record

  return (
    <div className="gameover-screen">
      <div className="gameover-content">
        <div className="gameover-icon">📦</div>

        <h1 className="gameover-title">Vous avez été renvoyé.</h1>

        <div className="gameover-card">
          <div className="gameover-stat">
            <span className="gameover-stat__label">Statut</span>
            <span className="gameover-stat__value">{currentStatus}</span>
          </div>
          <div className="gameover-stat">
            <span className="gameover-stat__label">Score</span>
            <span className="gameover-stat__value gameover-stat__value--score">{score}</span>
          </div>
          <div className="gameover-stat">
            <span className="gameover-stat__label">Record</span>
            <span className="gameover-stat__value">{record}</span>
          </div>
        </div>

        {isNewRecord && score > 0 && (
          <p className="gameover-newrecord">🏆 Nouveau record !</p>
        )}

        <p className="gameover-quote">
          &ldquo;On a pris la décision difficile de ne pas renouveler ta collaboration.&rdquo;
        </p>

        <button className="btn-primary btn-primary--danger" onClick={onHome}>
          Revenir au chômage
        </button>
      </div>
    </div>
  )
}
