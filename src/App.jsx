// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios
//       .get("/api/hello")
//       .then((response) => setMessage(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Hello world!</h1>
//       <h1>Spring Boot & React App</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChallengePage from "./pages/ChallengePage";
import NewChallenge from "./pages/NewChallenge";
import ActiveChallenge from "./pages/ActiveChallenge";
import ViewChallenge from "./pages/ViewChallenge";
import VideoSelectionPage from "./pages/VideoSelectionPage";

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
      </Routes>
    </BrowserRouter>
  );
}
