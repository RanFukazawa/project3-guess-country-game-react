import { useState } from "react";

// Final results summary
export default function ResultsScreen({ 
  score, 
  totalQuestions, 
  onPlayAgain, 
  userRecord,
  gameMode,
  onBackToHome
}) {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage >= 90) return "🎉 Excellent! Geography Expert!";
    if (percentage >= 70) return "👏 Great job! Keep it up!";
    if (percentage >= 50) return "👍 Good effort! Practice makes perfect!";
    return "Keep learning! Try again!";
  };

  return (
    <div className="results-screen">
      <h2>Quiz Complete!</h2>
      <p className="final-score">You scored {score} out of {totalQuestions}</p>
      <p className="percentage">{percentage}%</p>
      <p className="message">{getMessage()}</p>

      <button
        onClick={() => setShowReview(!showReview)}
        className="review-answers-button"
      >
        {showReview ? "Hide Review" : "Review Your Answers"}
      </button>

      {/* Question Review Section */}
      {showReview && (
        <div className="question-review">
          <h3>Review Your Answers</h3>
          {userRecord && userRecord.map((record) => (
            <div 
              key={record.questionNumber}
              className={`review-item ${record.isCorrect ? "correct" : "incorrect"}`}
            >
              <div className="review-header">
                <span className="question-num">Question {record.questionNumber}</span>
                <span className={`result-badge ${record.isCorrect ? "correct-badge" : "incorrect-badge"}`}>
                  {record.isCorrect ? "✓" : "✗"}
                </span>
              </div>

              {/* Render based on game mode */}
              {gameMode === "flag" && (
                <>
                  {/* FlagToCountry: Show flag, ask for country */}
                  <img
                    src={record.flagUrl}
                    alt={`Flag for question ${record.questionNumber}`}
                    className="review-flag"
                  />
                  <div className="answer-comparison">
                    <p className="country-name">
                      <strong>Country:</strong>
                      <span className="correct-text">{record.correctAnswer}</span>
                    </p>

                    {/* Show attempt info for correct on 2nd try */}
                    {record.isCorrect && record.attempts === 2 && (
                      <p className="attempt-info">
                        <span className="second-attempt-badge">2nd Attempt</span>
                        <span className="points-earned">+0.5 points</span>
                      </p>
                    )}

                    {/* Show both attempts for incorrect answers */}
                    {!record.isCorrect && (
                      <div className="wrong-attempts">
                        <p className="your-answer">
                          <strong>1st Attempt:</strong>
                          <span className="incorrect-text">{record.firstAttempt}</span>
                        </p>
                        <p className="your-answer">
                          <strong>2nd Attempt:</strong>
                          <span className="incorrect-text">{record.userAnswer}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {gameMode === "countryToFlag" && (
                <>
                  {/* CountryToFlag: Show country name, ask for flag */}
                  <div className="country-question-review">
                    <p className="country-name-question">
                      <strong>Question:</strong> Which flag belongs to {record.countryName}?
                    </p>
                  </div>
                  
                  <div className="flag-answer-review">
                    <div className="flag-option-review">
                      <p className="label">Correct Flag:</p>
                      <img
                        src={record.correctFlagUrl}
                        alt={`Correct flag for ${record.correctAnswer}`}
                        className="review-flag"
                      />
                      <p className="correct-text">{record.correctAnswer}</p>
                    </div>

                    {/* Show attempt info for correct answers */}
                    {record.isCorrect && record.attempts === 2 && (
                      <div className="attempt-info-flag">
                        <span className="second-attempt-badge">2nd Attempt</span>
                        <span className="points-earned">+0.5 points</span>
                      </div>
                    )}

                    {/* Show both flag attempts for incorrect answers */}
                    {!record.isCorrect && (
                      <>
                        <div className="flag-option-review incorrect-flag">
                          <p className="label">1st Attempt:</p>
                          <img
                            src={record.firstAttemptFlagUrl}
                            alt="First attempt flag"
                            className="review-flag"
                          />
                          <p className="incorrect-text">{record.firstAttempt}</p>
                        </div>
                        
                        <div className="flag-option-review incorrect-flag">
                          <p className="label">2nd Attempt:</p>
                          <img
                            src={record.selectedFlagUrl}
                            alt="Second attempt flag"
                            className="review-flag"
                          />
                          <p className="incorrect-text">{record.userAnswer}</p>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="button-group">
        <button onClick={onPlayAgain} className="play-again-button">
          Play Again 🔄
        </button>
        <button onClick={onBackToHome} className="home-button">
          Back to Home 🏠
        </button>
      </div>
    </div>
  );
}