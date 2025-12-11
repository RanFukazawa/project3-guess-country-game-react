// src/pages/InstructionPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import "../styles/instructionPage.css";

export default function InstructionPage() {
  const navigate = useNavigate();
  const { mode } = useParams(); // Get mode from URL

  const getInstructions = () => {
    if (mode === "flag") {
      return {
        title: "🏴 Flag to Country",
        icon: "🏴",
        steps: [
          "You'll see a country flag on the screen",
          "Choose the correct country name from 4 options",
          "Answer 10 questions total",
          "Get immediate feedback on each answer",
          "See your final score at the end!"
        ],
        tips: [
          "Take your time to look at the flag details",
          "Colors and symbols can give you hints",
          "Learn from wrong answers in the review"
        ]
      };
    } else {
      return {
        title: "🌍 Country to Flag",
        icon: "🌍",
        steps: [
          "You'll see a country name on the screen",
          "Choose the correct flag from 4 options",
          "Answer 10 questions total",
          "Get immediate feedback on each answer",
          "See your final score at the end!"
        ],
        tips: [
          "Think about the country's colors and symbols",
          "Some flags look similar - pay attention to details",
          "Learn from wrong answers in the review"
        ]
      };
    }
  };

  const instructions = getInstructions();

  return (
    <div className="instruction-page">
      <div className="instruction-container">
        <div className="instruction-header">
          <span className="instruction-icon">{instructions.icon}</span>
          <h1>{instructions.title}</h1>
        </div>

        <div className="instruction-content">
          <section className="how-to-play">
            <h2>How to Play:</h2>
            <ol className="instruction-steps">
              {instructions.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="tips-section">
            <h2>💡 Tips:</h2>
            <ul className="tips-list">
              {instructions.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          <div className="scoring-info">
            <h3>🏆 Scoring:</h3>
            <p>90%+ = Geography Expert!</p>
            <p>70-89% = Great Job!</p>
            <p>50-69% = Good Effort!</p>
            <p>Below 50% = Keep Learning!</p>
          </div>
        </div>

        <div className="button-group">
          <button 
            onClick={() => navigate("/")}
            className="back-button"
          >
            ← Back to Home
          </button>
          <button 
            onClick={() => navigate(`/game/${mode}`)}
            className="start-game-button"
          >
            Start Game 🎮
          </button>
        </div>
      </div>
    </div>
  );
}