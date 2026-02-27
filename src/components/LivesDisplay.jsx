export default function LivesDisplay({ lives }) {
  return (
    <div className="lives-display">
      {[1, 2, 3].map(i => (
        <img
          key={i}
          src={i <= lives ? '/coeur_plein.png' : '/coeur_vide.png'}
          alt={i <= lives ? 'vie' : 'vie perdue'}
          className={`heart ${i <= lives ? 'heart--active' : 'heart--lost'}`}
        />
      ))}
    </div>
  )
}
