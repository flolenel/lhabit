export default function LivesDisplay({ lives }) {
  return (
    <div className="lives-display">
      {[1, 2, 3].map(i => (
        <span key={i} className={`heart ${i <= lives ? 'heart--active' : 'heart--lost'}`}>
          {i <= lives ? '❤️' : '🖤'}
        </span>
      ))}
    </div>
  )
}
