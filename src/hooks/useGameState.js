import { useState, useCallback } from 'react'
import profiles from '../data/profiles.json'
import { statuts, malusPhrases, corporateImages, corporateMessages, BONUS_INTERVAL } from '../data/gameData'

function getJobForProfile(profile) {
  return profile.sexe === 'F' ? profile.metier_femme : profile.metier_homme
}

function getRandomChoices(correctProfile, allProfiles) {
  const correctJob = getJobForProfile(correctProfile)

  const otherJobs = []
  const shuffled = [...allProfiles]
    .filter(p => p.id !== correctProfile.id)
    .sort(() => Math.random() - 0.5)

  for (const p of shuffled) {
    const job = getJobForProfile(p)
    if (job !== correctJob && !otherJobs.includes(job)) {
      otherJobs.push(job)
      if (otherJobs.length === 2) break
    }
  }

  return [correctJob, ...otherJobs].sort(() => Math.random() - 0.5)
}

function generateQuestion() {
  const profile = profiles[Math.floor(Math.random() * profiles.length)]
  const choices = getRandomChoices(profile, profiles)
  return { profile, choices }
}

function generateBonusRound() {
  const withPhrase = profiles.filter(p => p.phrase)
  const main = withPhrase[Math.floor(Math.random() * withPhrase.length)]

  const others = [...profiles]
    .filter(p => p.id !== main.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)

  const bonusProfiles = [main, ...others].sort(() => Math.random() - 0.5)
  const correctIndex = bonusProfiles.findIndex(p => p.id === main.id)

  return { phrase: main.phrase, profiles: bonusProfiles, correctIndex }
}

export function useGameState() {
  const [screen, setScreen] = useState('home')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [malusPhrase, setMalusPhrase] = useState(null)
  const [corpOverlay, setCorpOverlay] = useState(null)
  const [isBonusRound, setIsBonusRound] = useState(false)
  const [bonusData, setBonusData] = useState(null)
  const [bonusSelected, setBonusSelected] = useState(null)
  const [record, setRecord] = useState(() =>
    parseInt(localStorage.getItem('lhnfpl_record') || '0')
  )

  const statusIndex = Math.min(score, statuts.length - 1)
  const currentStatus = statuts[statusIndex]

  const startGame = useCallback(() => {
    setScore(0)
    setLives(3)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setMalusPhrase(null)
    setCorpOverlay(null)
    setIsBonusRound(false)
    setBonusData(null)
    setBonusSelected(null)
    setQuestion(generateQuestion())
    setScreen('game')
  }, [])

  const loadNextQuestion = useCallback((newScore) => {
    if (newScore > 0 && newScore % BONUS_INTERVAL === 0) {
      setIsBonusRound(true)
      setBonusData(generateBonusRound())
      setBonusSelected(null)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsBonusRound(false)
      setQuestion(generateQuestion())
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }, [])

  const handleAnswer = useCallback((answer) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const correctAnswer = getJobForProfile(question.profile)
    const isCorrect = answer === correctAnswer

    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)

      if (newScore > record) {
        setRecord(newScore)
        localStorage.setItem('lhnfpl_record', newScore.toString())
      }

      const img = corporateImages[Math.floor(Math.random() * corporateImages.length)]
      const msg = corporateMessages[Math.floor(Math.random() * corporateMessages.length)]
      setCorpOverlay({ img, msg })

      setTimeout(() => {
        setCorpOverlay(null)
        loadNextQuestion(newScore)
      }, 1500)
    } else {
      const newLives = lives - 1
      setLives(newLives)

      const phrase = malusPhrases[Math.floor(Math.random() * malusPhrases.length)]
      setMalusPhrase(phrase)

      if (newLives <= 0) {
        setTimeout(() => {
          setMalusPhrase(null)
          setScreen('gameover')
        }, 2000)
      } else {
        setTimeout(() => {
          setMalusPhrase(null)
          setQuestion(generateQuestion())
          setSelectedAnswer(null)
          setIsAnswered(false)
        }, 2000)
      }
    }
  }, [isAnswered, question, score, lives, record, loadNextQuestion])

  const handleBonusAnswer = useCallback((index) => {
    if (bonusSelected !== null) return
    setBonusSelected(index)

    const isCorrect = index === bonusData.correctIndex
    if (isCorrect) {
      setLives(prev => Math.min(prev + 1, 3))
    }

    setTimeout(() => {
      setIsBonusRound(false)
      setBonusData(null)
      setBonusSelected(null)
      setQuestion(generateQuestion())
      setSelectedAnswer(null)
      setIsAnswered(false)
    }, 2000)
  }, [bonusSelected, bonusData])

  const goHome = useCallback(() => {
    setScreen('home')
  }, [])

  return {
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
    statusIndex,
    startGame,
    handleAnswer,
    handleBonusAnswer,
    goHome,
  }
}
