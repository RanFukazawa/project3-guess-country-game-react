import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import HomePage from "./pages/HomePage.jsx";
import InstructionPage from "./pages/InstructionPage";
import AdminPage from "./pages/AdminPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>🌎 Guess Country Game</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>

            {isAuthenticated ? (
              <>
                <Link to="/admin">Admin</Link>
                <span>Welcome, {user?.name}!</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Admin</Link>
            )}
          </div>
        </nav>

        {/* Page Routes */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/instructions/:mode" element={<InstructionPage />} />
            <Route path="/game/:mode" element={<GamePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}