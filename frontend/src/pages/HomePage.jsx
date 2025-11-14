// Landing welcome page
import "../styles/homePage.css";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>🌍 Guess Country Game</h1>
      <div className="game-info">
        <h2>How to Play:</h2>
        <ul>
          <li>🚩 You'll see a country flag</li>
          <li>🎯 Choose the correct country from 4 options</li>
          <li>📊 Answer 10 questions</li>
          <li>🏆 See your final score!</li>
        </ul>

        <button 
          onClick={() => navigate("/game")}
          className="start-button"
        >
          Start Game  🎮
        </button>
      </div>
    </div>
  )
}