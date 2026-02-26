export default function StatusBar({ status, score }) {
  return (
    <div className="status-bar">
      <span className="status-bar__label">Statut</span>
      <span className="status-bar__value">{status}</span>
      <span className="status-bar__score">Score : {score}</span>
    </div>
  )
}
