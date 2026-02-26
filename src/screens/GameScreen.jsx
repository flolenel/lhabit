import LivesDisplay from '../components/LivesDisplay'
import StatusBar from '../components/StatusBar'
import ProfileCard from '../components/ProfileCard'
import AnswerButtons from '../components/AnswerButtons'
import BonusRound from '../components/BonusRound'
import CorporateOverlay from '../components/CorporateOverlay'

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

  return (
    <div className="game-screen">
      {/* Top bar */}
      <div className="game-topbar">
        <LivesDisplay lives={lives} />
        <StatusBar status={currentStatus} score={score} />
      </div>

      {/* Corporate overlay after correct answer */}
      {corpOverlay && <CorporateOverlay overlay={corpOverlay} />}

      {/* Malus toast */}
      {malusPhrase && (
        <div className="malus-toast">
          <span className="malus-toast__icon">📧</span>
          {malusPhrase}
        </div>
      )}

      {/* Main content */}
      <div className="game-content">
        {isBonusRound ? (
          <BonusRound
            bonusData={bonusData}
            bonusSelected={bonusSelected}
            onAnswer={onBonusAnswer}
          />
        ) : (
          <>
            {question && <ProfileCard profile={question.profile} />}
            {question && (
              <AnswerButtons
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
