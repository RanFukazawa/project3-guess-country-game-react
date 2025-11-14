import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import GamePage from "./pages/GamePage.jsx";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>🌎 Guess Country Game</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/game">Play Game</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>

        {/* Page Routes */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/game" element={<GamePage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}