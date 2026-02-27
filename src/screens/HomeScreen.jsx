import { useState, useEffect } from "react";
import profiles from "../data/profiles.json";

const MAX_JOB_LENGTH = 50;
const allJobs = [...new Set(profiles.map((p) => p.metier_homme))].filter(
  (j) => j.length <= MAX_JOB_LENGTH,
);

export default function HomeScreen({ record, onPlay }) {
  const [jobIndex, setJobIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setJobIndex((i) => (i + 1) % allJobs.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="home-logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <div className="home-title-block">
          {/* Slot fixe : le métier change à l'intérieur sans faire bouger le reste */}
          <div className="home-title-job-slot">
            <span
              className={`home-title__job ${fade ? "home-title__job--visible" : "home-title__job--hidden"}`}
            >
              {allJobs[jobIndex].toUpperCase()}
            </span>
          </div>
        </div>

        <p className="home-subtitle">
          Sauras-tu deviner le métier de ces profils professionnels ?
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
  );
}
