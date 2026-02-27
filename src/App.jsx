import { useState } from 'react'
import { useGameState } from './hooks/useGameState'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import PasswordGate from './components/PasswordGate'

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('unlocked') === 'true'
  )

  const handleUnlock = () => {
    sessionStorage.setItem('unlocked', 'true')
    setUnlocked(true)
  }

  const {
    screen,
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
    record,
    currentStatus,
    startGame,
    handleAnswer,
    handleBonusAnswer,
    goHome,
  } = useGameState()

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen record={record} onPlay={startGame} />
      )}

      {screen === 'game' && (
        <GameScreen
          score={score}
          lives={lives}
          question={question}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          malusPhrase={malusPhrase}
          corpOverlay={corpOverlay}
          isBonusRound={isBonusRound}
          bonusData={bonusData}
          bonusSelected={bonusSelected}
          currentStatus={currentStatus}
          onAnswer={handleAnswer}
          onBonusAnswer={handleBonusAnswer}
        />
      )}

      {screen === 'gameover' && (
        <GameOverScreen
          score={score}
          record={record}
          currentStatus={currentStatus}
          onHome={goHome}
        />
      )}
    </div>
  )
}
