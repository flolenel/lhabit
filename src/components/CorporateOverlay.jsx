export default function CorporateOverlay({ overlay }) {
  if (!overlay) return null

  return (
    <div className="corp-overlay">
      <img src={overlay.img} alt="Corporate" className="corp-overlay__img" />
      <div className="corp-overlay__msg">{overlay.msg}</div>
    </div>
  )
}
