export default function StatusBar({ status, score }) {
  return (
    <>
      {/* Statut — centré dans la topbar */}
      <div className="status-center">
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
