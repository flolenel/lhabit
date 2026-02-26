export default function AnswerButtons({ choices, selectedAnswer, isAnswered, correctAnswer, onAnswer }) {
  function getButtonState(choice) {
    if (!isAnswered) return 'default'
    if (choice === correctAnswer) return 'correct'
    if (choice === selectedAnswer) return 'wrong'
    return 'disabled'
  }

  return (
    <div className="answer-buttons">
      {choices.map((choice) => {
        const state = getButtonState(choice)
        return (
          <button
            key={choice}
            className={`answer-btn answer-btn--${state}`}
            onClick={() => !isAnswered && onAnswer(choice)}
            disabled={isAnswered && state === 'disabled'}
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
}
