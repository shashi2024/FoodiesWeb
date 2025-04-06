// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ActiveChallenge() {
//   const { id } = useParams();
//   const [challenge, setChallenge] = useState(null);
//   const [recipe, setRecipe] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`/api/challenges/user123`)
//       .then((res) => {
//         const ch = res.data.find((c) => c.id === id);
//         setChallenge(ch);
//         return axios.get(`/api/recipes`);
//       })
//       .then((res) => {
//         const r = res.data.find((r) => r.id === challenge?.recipeId);
//         setRecipe(r);
//       });
//   }, [id, challenge?.recipeId]);

//   useEffect(() => {
//     if (challenge) {
//       const end = new Date(`${challenge.date}T${challenge.endTime}`);
//       const interval = setInterval(() => {
//         const now = new Date();
//         const diff = end - now;
//         if (diff <= 0) {
//           clearInterval(interval);
//           setTimeLeft(0);
//         } else {
//           setTimeLeft(Math.floor(diff / 1000));
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [challenge]);

//   const handleFinish = () => {
//     const formData = new FormData();
//     images.forEach((img) => formData.append("images", img));

//     axios.post(`/api/challenges/${id}/finish`, formData).then(() => {
//       alert("Challenge finished!");
//       navigate("/challenges"); // Redirect after finishing
//     });
//   };

//   const goToChallenges = () => {
//     navigate("/challenges");
//   };

//   if (!challenge || !recipe) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <button
//         onClick={goToChallenges}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//       >
//         Go to Challenges Page
//       </button>

//       <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>

//       <video
//         src={recipe.videoUrl}
//         controls
//         autoPlay
//         className="w-full mt-2 mb-4 rounded"
//       />

//       {timeLeft !== null && (
//         <p className="text-red-500 mb-4">
//           Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
//         </p>
//       )}

//       <div className="mb-4">
//         <label className="block mb-1 font-medium">Upload Completion Images</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => setImages(Array.from(e.target.files))}
//           className="block border p-2 rounded w-full"
//         />
//       </div>

//       <button
//         onClick={handleFinish}
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//       >
//         Finish Challenge
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ActiveChallenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [timerInterval, setTimerInterval] = useState(null);

  // Mock Data
  const mockChallenge = {
    id: "1",
    date: "2025-04-07",
    startTime: "10:00",
    endTime: "10:30",
    recipeId: "r1",
    status: "planned",
  };

  const mockRecipe = {
    id: "r1",
    title: "Mock Recipe",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  };

  useEffect(() => {
    setTimeout(() => {
      setChallenge(mockChallenge);
      setRecipe(mockRecipe);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (challenge) {
      const end = new Date(`${challenge.date}T${challenge.endTime}`);
      const interval = setInterval(() => {
        const now = new Date();
        const diff = end - now;
        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
        } else {
          setTimeLeft(Math.floor(diff / 1000));
        }
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [challenge]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const handleFinish = () => {
    setIsUploading(true);
    clearInterval(timerInterval); // Stop timer
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Only up to 3 photos allowed.");
      return;
    }
    setImages(files);
    setSuccess(true); // Show success popup

    // Navigate to challenges page after 3 seconds
    setTimeout(() => {
      navigate("/challenges");
    }, 3000);
  };

  const goToChallenges = () => {
    navigate("/challenges");
  };

  if (!challenge || !recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={goToChallenges}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Challenges Page
      </button>

      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>

      <video
        src={recipe.videoUrl}
        controls
        autoPlay
        className="w-full mt-4 mb-4 rounded"
      />

      {timeLeft !== null && (
        <p className="text-red-600 font-semibold mb-4">
          Time Left: {formatTime(timeLeft)}
        </p>
      )}

      <button
        onClick={handleFinish}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-4"
      >
        Finish Challenge
      </button>

      {isUploading && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Upload up to 3 photos:</label>
          <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded inline-block text-sm text-gray-700">
            Upload Pictures
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-2">
          Photos uploaded successfully!
        </div>
      )}
    </div>
  );
}

