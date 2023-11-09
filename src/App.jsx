import "./styles/_global.scss";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/Signup/Signup";
import LogIn from "./pages/LogIn/LogIn";
import CreateCommunitiPage from "./pages/CreateCommunitiPage/CreateCommunitiPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/create-communiti" element={<CreateCommunitiPage />} />
    </Routes>
  );
}

export default App;
