import "../../styles/game.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import ModeSelector from "./ModeSelector.jsx";
import FlagToCountry from "./modes/FlagToCountry.jsx";
import CountryToFlag from "./modes/CountryToFlag.jsx";
import ResultsScreen from "./ResultsScreen.jsx";

export default function QuizGame({ initialMode }) {
  const navigate = useNavigate();
  
  const [gameMode, setGameMode] = useState(initialMode || null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(initialMode ? "playing" : "selecting");
  const [record, setRecord] = useState([]);

  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (initialMode) {
      startGame(initialMode);
    }
  }, [initialMode]);

  const startGame = (mode) => {
    setGameMode(mode);
    setGameStatus("playing");
    setQuestionNumber(1);
    setScore(0);
    setRecord([]);
  };

  const handleCorrectAnswer = (points = 1) => {
    setScore(score + points);
  };

  const addRecord = (recordItem) => {
    setRecord(prevRecord => [...prevRecord, recordItem]);
  };

  const nextQuestion = () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setGameStatus("finished");
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handlePlayAgain = () => {
    // Keep same mode, restart game
    setQuestionNumber(1);
    setScore(0);
    setRecord([]);
    setGameStatus("playing");
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate to home page
  };

  // Mode selection screen
  if (gameStatus === "selecting") {
    return <ModeSelector onSelectMode={startGame} />;
  }

  // Results screen
  if (gameStatus === "finished") {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        onPlayAgain={handlePlayAgain}
        onBackToHome={handleBackToHome}
        userRecord={record}
        gameMode={gameMode}
      />
    );
  }

  // Shared props for game modes
  const sharedProps = {
    questionNumber,
    totalQuestions: TOTAL_QUESTIONS,
    score,
    onCorrectAnswer: handleCorrectAnswer,
    onNextQuestion: nextQuestion,
    onAddRecord: addRecord,
  };

  // Play game - render mode component
  return (
    <div className="quiz-game">
      {gameMode === "flag" && <FlagToCountry {...sharedProps} />}
      {gameMode === "countryToFlag" && <CountryToFlag {...sharedProps} />}
    </div>
  );
}