import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChallengePage from "./pages/Challenges/ChallengePage";
import NewChallenge from "./pages/Challenges/NewChallenge";
import ActiveChallenge from "./pages/Challenges/ActiveChallenge";
import ViewChallenge from "./pages/Challenges/ViewChallenge";
import VideoSelectionPage from "./pages/Challenges/VideoSelectionPage";
import EditChallengePage from "./pages/Challenges/EditChallengePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<ChallengePage />} />
        <Route path="/new-challenge" element={<NewChallenge />} />
        <Route path="/challenge/:id/start" element={<ActiveChallenge />} />
        <Route path="/challenge/:id/view" element={<ViewChallenge />} />
        <Route path="/video-selection" element={<VideoSelectionPage />} />
        <Route path="/edit-challenge/:id" element={<EditChallengePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
