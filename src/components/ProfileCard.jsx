export default function ProfileCard({ profile }) {
  if (!profile) return null

  return (
    <div className="profile-card">
      <div className="profile-card__photo-wrapper">
        <img
          src={profile.photo}
          alt="Profil à deviner"
          className="profile-card__photo"
          loading="lazy"
        />
      </div>
      <p className="profile-card__question">Quel est son métier ?</p>
    </div>
  )
}
