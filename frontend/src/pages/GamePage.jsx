import { useParams } from "react-router-dom";
import QuizGame from "../components/game/QuizGame";

export default function GamePage() {
  const { mode } = useParams(); // Get mode from URL
  
  return <QuizGame initialMode={mode} />;
}