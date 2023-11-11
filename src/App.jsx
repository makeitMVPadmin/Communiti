import "./styles/_global.scss";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Signup/Signup";
import LogIn from "./pages/LogIn/LogIn";
import EventsPage from "./pages/Events/EventsPage";
import EventsHomePage from "./pages/Events/EventsHomePage";
import EventsCommunitiesPage from "./pages/Events/EventsCommunitiesPage";
import EventsChatsPage from "./pages/Events/EventsChatsPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CreateCommunitiPage from "./pages/Communites/CreateCommunitiPage/CreateCommunitiPage";
import Communities from "./pages/Communites/Communities";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/events" element={<EventsHomePage />} />
      <Route path="/events/communities" element={<EventsCommunitiesPage />} />
      <Route path="/events/chat" element={<EventsChatsPage />} />
      <Route path="/events/events" element={<EventsPage />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/communities/create" element={<CreateCommunitiPage />} />
    </Routes>
  );
}

export default App;
