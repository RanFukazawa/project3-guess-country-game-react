export default function FeedbackMessage({ show, isCorrect, correctAnswer, isSecondChance }) {
  if (!show) return null;

  return (
    <div className={`feedback-message ${isCorrect ? "correct" : "incorrect"}`}>
      {isCorrect ? (
        <p>✅ Correct! {correctAnswer}</p>
      ) : isSecondChance ? (
        <p>❌ Wrong! Try one more time!</p>
      ) : (
        <p>❌ Incorrect! The answer was {correctAnswer}</p>
      )}
    </div>
  );
}