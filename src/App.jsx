import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Signup/Signup";
import LogIn from "./pages/LogIn/LogIn";
import ForgotPage from "./pages/ForgotPage/ForgotPage";
import EventsPage from "./pages/Events/EventsPage";
import EventsHomePage from "./pages/Events/EventsHomePage";
import EventsCommunitiesPage from "./pages/Events/EventsCommunitiesPage";
import EventsChatsPage from "./pages/Events/EventsChatsPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CreateCommunitiPage from "./pages/Communites/CreateCommunitiPage/CreateCommunitiPage";
import Communities from "./pages/Communites/Communities";
import Announcements from "./pages/Announcements/Announcements";
import { auth } from "./Firebase/FirebaseConfig"; // Update with the correct path

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    // You might want to add a loading spinner or some indicator here
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot" element={<ForgotPage />} />

      {user ? (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/events" element={<EventsHomePage />} />
          <Route
            path="/events/communities"
            element={<EventsCommunitiesPage />}
          />
          <Route path="/chat" element={<EventsChatsPage />} />
          <Route path="/events/events" element={<EventsPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/create" element={<CreateCommunitiPage />} />
          <Route path="/announcements" element={<Announcements />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
