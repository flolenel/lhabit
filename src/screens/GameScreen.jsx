import LivesDisplay from '../components/LivesDisplay'
import StatusBar from '../components/StatusBar'
import ProfileCard from '../components/ProfileCard'
import AnswerButtons from '../components/AnswerButtons'
import BonusRound from '../components/BonusRound'

export default function GameScreen({
  score,
  lives,
  question,
  selectedAnswer,
  isAnswered,
  malusPhrase,
  corpOverlay,
  isBonusRound,
  bonusData,
  bonusSelected,
  currentStatus,
  onAnswer,
  onBonusAnswer,
}) {
  const correctAnswer = question
    ? (question.profile.sexe === 'F' ? question.profile.metier_femme : question.profile.metier_homme)
    : null

  const feedbackPhrase = malusPhrase || (corpOverlay?.msg ?? null)
  const isCorrectFeedback = !malusPhrase && !!corpOverlay?.msg

  return (
    <div className="game-screen">

      {/* Image de fond floutée (bonne ou mauvaise réponse) */}
      {corpOverlay && (
        <div
          className={`game-bg game-bg--${corpOverlay.type}`}
          style={{ backgroundImage: `url(${corpOverlay.img})` }}
        />
      )}

      {/* Top bar */}
      <div className="game-topbar">
        <LivesDisplay lives={lives} />
        <StatusBar status={currentStatus} score={score} />
      </div>

      {/* Contenu principal */}
      <div className="game-content">
        {isBonusRound ? (
          <BonusRound
            bonusData={bonusData}
            bonusSelected={bonusSelected}
            onAnswer={onBonusAnswer}
          />
        ) : (
          <>
            {/* Slot réservé pour la phrase — toujours présent pour éviter le layout shift */}
            <div className="feedback-slot">
              {feedbackPhrase && (
                <div className={`feedback-phrase ${isCorrectFeedback ? 'feedback-phrase--correct' : 'feedback-phrase--malus'}`}>
                  {feedbackPhrase}
                </div>
              )}
            </div>

            {question && <ProfileCard profile={question.profile} />}

            {question && (
              <AnswerButtons
                key={question.profile.id}
                choices={question.choices}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                correctAnswer={correctAnswer}
                onAnswer={onAnswer}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
