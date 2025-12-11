export default function ModeSelector({ onSelectMode }) {
  return (
    <div className="mode-selector">
      <h2>Select Game Mode</h2>
      
      <div className="mode-cards">
        <button
          className="mode-card"
          onClick={() => onSelectMode("flag")}
        >
          <span className="mode-icon">🏴</span>
          <h3>Flag to Country</h3>
          <p>Guess the country from its flag.</p>
        </button>

        <button
          className="mode-card"
          onClick={() => onSelectMode("countryToFlag")}
        >
          <span className="mode-icon">🌍</span>
          <h3>Country to Flag</h3>
          <p>Guess the flag from the country name.</p>
        </button> 
      </div>
    </div>
  ); 
}