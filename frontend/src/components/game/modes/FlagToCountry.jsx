import { useState, useEffect } from "react";
import { checkAnswer, getRandomCountry } from "../../../services/api";
import QuestionDisplay from "../QuestionDisplay.jsx";
import AnswerOptions from "../AnswerOptions.jsx";
import ScoreDisplay from "../ScoreDisplay.jsx";
import FeedbackMessage from "../FeedbackMessage.jsx";

export default function FlagToCountry({ 
  questionNumber,
  totalQuestions,
  score,
  onCorrectAnswer,
  onNextQuestion,
  onAddRecord,
}) {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [firstAttemptAnswer, setFirstAttemptAnswer] = useState(null);

  useEffect(() => {
    fetchQuestion(); 
  }, [questionNumber]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const country = await getRandomCountry();
      setCurrentCountry(country);
      setAttemptCount(0);
      setFirstAttemptAnswer(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again.");
      setLoading(false);
    }
  };

  const handleAnswerSelect = async (selectedAnswer) => {
    if (answersDisabled) return; 

    setAnswersDisabled(true);

    try {
      const result = await checkAnswer(currentCountry._id, selectedAnswer);
      
      setIsCorrect(result.correct);
      setCorrectAnswer(result.correctAnswer);
      setShowFeedback(true);

      const currentAttempt = attemptCount + 1;

      if (result.correct) {
        // Correct answer
        if (currentAttempt === 1) {
          // First try correct - full point
          onCorrectAnswer(); // 1 full point
        } else {
          // Second try correct - half point
          onCorrectAnswer(0.5); // 0.5 points
        }

        // Record and move to next question
        onAddRecord({
          questionNumber: questionNumber,
          flagUrl: currentCountry.flagUrl,
          userAnswer: selectedAnswer,
          correctAnswer: result.correctAnswer,
          isCorrect: true,
          attempts: currentAttempt,
          firstAttempt: currentAttempt === 1 ? selectedAnswer : firstAttemptAnswer
        });

        // Move to next question after delay
        setTimeout(() => {
          setShowFeedback(false);
          setAnswersDisabled(false);
          onNextQuestion();
        }, 1300);

      } else {
        // Wrong answer
        if (currentAttempt === 1) {
          // First attempt wrong - give second chance
          setAttemptCount(1);
          setFirstAttemptAnswer(selectedAnswer);

          setTimeout(() => {
            setShowFeedback(false);
            setAnswersDisabled(false); // Re-enable for second attempt
          }, 1500);

        } else {
          // Second attempt wrong - no more chances
          onAddRecord({
            questionNumber: questionNumber,
            flagUrl: currentCountry.flagUrl,
            userAnswer: selectedAnswer,
            correctAnswer: result.correctAnswer,
            isCorrect: false,
            attempts: 2,
            firstAttempt: firstAttemptAnswer
          });

          // Move to next question
          setTimeout(() => {
            setShowFeedback(false);
            setAnswersDisabled(false);
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

      {/* Show attempt indicator */}
      {attemptCount === 1 && (
        <div className="second-chance-indicator">
          💡 Second Chance! (Half points if correct)
        </div>
      )}

      <QuestionDisplay 
        flagUrl={currentCountry?.flagUrl}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />

      <AnswerOptions
        options={currentCountry?.options || []}
        onSelectAnswer={handleAnswerSelect}
        disabled={answersDisabled}
      />

      <FeedbackMessage
        show={showFeedback}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer}
        isSecondChance={attemptCount === 1 && !isCorrect}
      />
    </>
  );
}