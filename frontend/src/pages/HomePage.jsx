// Landing welcome page
import "../styles/homePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🌍 Guess Country Game</h1>
        <p className="tagline">Test your geography knowledge!</p>
      </div>

      <div className="game-modes-section">
        <h2>Choose Your Game Mode</h2>
        
        <div className="game-mode-cards">
          {/* Flag to Country Mode */}
          <div 
            className="game-mode-card"
            onClick={() => navigate("/instructions/flag")}
          >
            <div className="mode-icon">🏴</div>
            <h3>Flag to Country</h3>
            <p className="mode-description">
              See a flag and guess which country it belongs to
            </p>
            <ul className="mode-features">
              <li>🎯 10 Questions</li>
              <li>🌎 Multiple Choice</li>
              <li>⏱️ Quick & Fun</li>
            </ul>
            <button className="mode-button">Play Now →</button>
          </div>

          {/* Country to Flag Mode */}
          <div 
            className="game-mode-card"
            onClick={() => navigate("/instructions/countryToFlag")}
          >
            <div className="mode-icon">🌍</div>
            <h3>Country to Flag</h3>
            <p className="mode-description">
              Read a country name and pick the correct flag
            </p>
            <ul className="mode-features">
              <li>🎯 10 Questions</li>
              <li>🏁 4 Flag Options</li>
              <li>⏱️ Quick & Fun</li>
            </ul>
            <button className="mode-button">Play Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}