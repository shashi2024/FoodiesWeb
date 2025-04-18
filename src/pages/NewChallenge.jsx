// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import RecipeSelector from "../components/RecipeSelector.jsx";

// export default function NewChallenge() {
//   const [recipes, setRecipes] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [date, setDate] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/api/recipes").then(res => setRecipes(res.data));
//   }, []);

//   const handleSubmit = async () => {
//     if (!selected || !date || !start || !end) return alert("Fill all fields!");
//     await axios.post("/api/challenges", {
//       userId: "user123",
//       recipeId: selected.id,
//       date,
//       startTime: start,
//       endTime: end,
//       status: "planned",
//       imageUrls: []
//     });
//     navigate("/challenges");
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">Start a New Challenge</h2>

//       <RecipeSelector
//         recipes={recipes}
//         selected={selected}
//         onSelect={setSelected}
//       />

//       <div className="mt-6 space-y-4">
//         <div>
//           <label className="block font-medium">Date:</label>
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Start Time:</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block font-medium">End Time:</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Start Challenge
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function NewChallenge() {
//   const [recipes, setRecipes] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [date, setDate] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/api/recipes").then(res => setRecipes(res.data));
//   }, []);

//   const handleSubmit = async () => {
//     if ( !date || !start || !end) {
//       alert("Please fill out all fields and select a recipe.");
//       return;
//     }

//     await axios.post("/api/challenges", {
//       userId: "user123",
//       recipeId: selected.id,
//       date,
//       startTime: start,
//       endTime: end,
//       status: "planned",
//       imageUrls: [],
//     });
//     navigate("/challenges");
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">

//       <div className="space-y-4 mb-6">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Start Time</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">End Time</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//       >
//         Start Challenge
//       </button>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const NewChallenge = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(null);
//   const [date, setDate] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");

//   useEffect(() => {
//     if (location.state?.selected) {
//       setSelected(location.state.selected);
//     }
//   }, [location.state]);

//   const handleSubmit = () => {
//     if ( !date || !start || !end) {
//       alert("Please fill all fields");
//       return;
//     }

//     // ✅ Navigation after 'fake' submission
//     navigate("/challenge/:id/start");
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Start Challenge for: {selected?.name}</h2>

//       <div className="space-y-4 mb-6">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Start Time</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">End Time</label>
//           <input
//             type="time"
//             className="border p-2 rounded w-full"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//       >
//         Start Challenge
//       </button>
//     </div>
//   );
// };

// export default NewChallenge;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NewChallenge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (location.state?.selected) {
      setSelected(location.state.selected);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!date || !start || !end) {
      alert("Please fill all fields");
      return;
    }
    navigate("/challenge/:id/start");
    //   };

    try {
      // Sending challenge data to the backend (adjust API URL as needed)
      const response = await axios.post("/api/challenges", {
        title: selected?.name, // Assuming "name" exists in the selected item
        startDate: date,
        startTime: start,
        endTime: end,
        status: "Pending", // Default status is "Pending"
        userId: "user123", // Replace with actual user ID
        // Add other fields if necessary, like recipeId, description, etc.
      });
      
      if (response.status === 200 || response.status === 201) {
        alert("Challenge created successfully!");
        navigate(`/challenge/${response.data.id}/start`); // Navigate to the challenge start page
      }
    } catch (error) {
      alert("Error creating challenge. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Start Challenge for: {selected?.name}</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="time"
            className="border p-2 rounded w-full"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="time"
            className="border p-2 rounded w-full"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Start Challenge
      </button>
    </div>
  );
};

export default NewChallenge;
