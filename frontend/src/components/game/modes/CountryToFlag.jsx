import { useState, useEffect } from "react";
import { checkAnswer, getRandomCountryWithFlags } from "../../../services/api";
import ScoreDisplay from "../ScoreDisplay.jsx";
import FeedbackMessage from "../FeedbackMessage.jsx";

export default function CountryToFlag({ 
  questionNumber,
  totalQuestions,
  score,
  onCorrectAnswer,
  onNextQuestion,
  onAddRecord 
}) {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [flagOptions, setFlagOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [firstAttemptAnswer, setFirstAttemptAnswer] = useState(null);
	const [firstAttemptFlagUrl, setFirstAttemptFlagUrl] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, [questionNumber]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const countryData = await getRandomCountryWithFlags();
      setCurrentCountry(countryData);
      setFlagOptions(countryData.flagOptions);
      setAttemptCount(0);
      setFirstAttemptAnswer(null);
			setFirstAttemptFlagUrl(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again.");
      setLoading(false);
    }
  };

  const handleFlagSelect = async (selectedOption) => {
    if (answersDisabled) return;

    setAnswersDisabled(true);
    setSelectedFlag(selectedOption.flagUrl);

    try {
      const result = await checkAnswer(currentCountry._id, selectedOption.name);

      setIsCorrect(result.correct);
      setCorrectAnswer(result.correctAnswer);
      setShowFeedback(true);

      const currentAttempt = attemptCount + 1;

      if (result.correct) {
        // Correct answer
        if (currentAttempt === 1) {
          onCorrectAnswer(); // Full point
        } else {
          onCorrectAnswer(0.5); // Half point
        }

        onAddRecord({
          questionNumber: questionNumber,
          countryName: currentCountry.name,
          userAnswer: selectedOption.name,
          correctAnswer: result.correctAnswer,
          isCorrect: true,
          selectedFlagUrl: selectedOption.flagUrl,
          correctFlagUrl: currentCountry.flagUrl,
          attempts: currentAttempt,
          firstAttempt: currentAttempt === 1 ? selectedOption.name : firstAttemptAnswer,
					firstAttemptFlagUrl: currentAttempt === 1 ? selectedOption.flagUrl : firstAttemptFlagUrl
        });

        setTimeout(() => {
          setShowFeedback(false);
          setAnswersDisabled(false);
          setSelectedFlag(null);
          onNextQuestion();
        }, 1300);

      } else {
        // Wrong answer
        if (currentAttempt === 1) {
          // First attempt - give second chance
          setAttemptCount(1);
          setFirstAttemptAnswer(selectedOption.name);
					setFirstAttemptFlagUrl(selectedOption.flagUrl);

          setTimeout(() => {
            setShowFeedback(false);
            setAnswersDisabled(false);
            setSelectedFlag(null);
          }, 1500);

        } else {
          // Second attempt - no more chances
          onAddRecord({
            questionNumber: questionNumber,
            countryName: currentCountry.name,
            userAnswer: selectedOption.name,
            correctAnswer: result.correctAnswer,
            isCorrect: false,
            selectedFlagUrl: selectedOption.flagUrl,
            correctFlagUrl: currentCountry.flagUrl,
            attempts: 2,
            firstAttempt: firstAttemptAnswer,
						firstAttemptFlagUrl: firstAttemptFlagUrl
          });

          setTimeout(() => {
            setShowFeedback(false);
            setAnswersDisabled(false);
            setSelectedFlag(null);
            onNextQuestion();
          }, 2000);
        }
      }
    } catch (err) {
      console.error("Error checking answer:", err);
      setError("Failed to check answer. Please try again.");
      setAnswersDisabled(false);
    }
  };

  if (loading && questionNumber === 1) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return (
      <>
        <p className="error">{error}</p>
        <button onClick={fetchQuestion}>Try Again</button>
      </>
    );
  }

  return (
    <>
      <ScoreDisplay correct={score} totalQuestions={totalQuestions} />

      {attemptCount === 1 && (
        <div className="second-chance-indicator">
          💡 Second Chance! (Half points if correct)
        </div>
      )}

      <div className="question-container">
        <p className="question-label">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="country-name-question">
          Which flag belongs to <strong>{currentCountry?.name}</strong>?
        </h2>
      </div>

      <div className="flag-options-grid">
        {flagOptions.map((option, index) => (
          <button
            key={option._id}
            onClick={() => handleFlagSelect(option)}
            disabled={answersDisabled}
            className={`flag-option ${
              selectedFlag === option.flagUrl 
                ? (isCorrect ? 'selected-correct' : 'selected-incorrect')
                : ''
            }`}
          >
            <img 
              src={option.flagUrl} 
              alt={`Flag option ${index + 1}`}
              className="flag-option-image"
            />
          </button>
        ))}
      </div>

      <FeedbackMessage
        show={showFeedback}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer}
        isSecondChance={attemptCount === 1 && !isCorrect}
      />
    </>
  );
}