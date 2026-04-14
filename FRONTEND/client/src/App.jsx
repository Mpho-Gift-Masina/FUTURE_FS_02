import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import { getAuthToken, removeAuthToken, verifyToken } from "./lib/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("landing"); // "landing" | "login" | "signup" | "dashboard"

  const handleGoToDashboard = async () => {
    const valid = await verifyToken();
    if (valid) {
      setIsAuthenticated(true);
    } else {
      removeAuthToken();
      setView("login");
    }
  };

  if (isAuthenticated) {
    return (
      <Dashboard
        onLogout={() => {
          setIsAuthenticated(false);
          setView("landing");
        }}
      />
    );
  }

  if (view === "login") {
    return (
      <Login
        onLoginSuccess={() => setIsAuthenticated(true)}
        onGoToSignup={() => setView("signup")}
        onGoToLanding={() => setView("landing")}
      />
    );
  }

  if (view === "signup") {
    return (
      <Signup
        onSignupSuccess={() => setIsAuthenticated(true)}
        onGoToLogin={() => setView("login")}
        onGoToLanding={() => setView("landing")}
      />
    );
  }

  return (
    <LandingPage
      onGoToLogin={() => setView("login")}
      onGoToSignup={() => setView("signup")}
      hasSession={!!getAuthToken()}
      onGoToDashboard={handleGoToDashboard}
    />
  );
}

export default App;
