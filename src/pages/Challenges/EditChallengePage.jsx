// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EditChallengePage() {
//   const { id } = useParams(); // Challenge ID from URL
//   const navigate = useNavigate();

//   const [challenge, setChallenge] = useState(null);
//   const [recipes, setRecipes] = useState([]);
//   const [formData, setFormData] = useState({
//     date: "",
//     startTime: "",
//     endTime: "",
//     recipeId: ""
//   });

//   useEffect(() => {
//     fetchChallenge();
//     fetchRecipes();
//   }, [id]);

//   const fetchChallenge = async () => {
//     const res = await axios.get(`/api/challenges/${id}`);
//     setChallenge(res.data);
//     setFormData({
//       date: res.data.date,
//       startTime: res.data.startTime,
//       endTime: res.data.endTime,
//       recipeId: res.data.recipeId
//     });
//   };

//   const fetchRecipes = async () => {
//     const res = await axios.get(`/api/recipes`);
//     setRecipes(res.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.put(`/api/challenges/${id}`, formData);
//     navigate("/challenges");
//   };

//   if (!challenge) return <div className="p-10">Loading challenge data...</div>;

//   return (
//     <div className="p-10 max-w-xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Edit Challenge</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-1 font-medium">Start Time</label>
//             <input
//               type="time"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block mb-1 font-medium">End Time</label>
//             <input
//               type="time"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Select Recipe / Video</label>
//           <select
//             name="recipeId"
//             value={formData.recipeId}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             required
//           >
//             <option value="" disabled>Select a recipe</option>
//             {recipes.map(recipe => (
//               <option key={recipe.id} value={recipe.id}>
//                 {recipe.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate("/challenges")}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    recipeId: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    fetchChallengeAndRecipes();
  }, [id]);

  const fetchChallengeAndRecipes = async () => {
    try {
      const [challengeRes, recipesRes] = await Promise.all([
        axios.get(`/api/challenges/${id}`),
        // axios.get(`/api/recipes`)
      ]);

      const fetchedChallenge = challengeRes?.data;
      const fetchedRecipes = recipesRes?.data || [];

      setChallenge(fetchedChallenge);
      setRecipes(fetchedRecipes);

      setForm({
        recipeId: fetchedChallenge.recipeId,
        date: fetchedChallenge.date,
        startTime: fetchedChallenge.startTime,
        endTime: fetchedChallenge.endTime
      });
    } catch (err) {
      console.error("Error fetching challenge or recipes", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/challenges/${id}`, form);
      navigate("/challenges");
    } catch (err) {
      console.error("Failed to update challenge", err);
    }
  };

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Recipe</label>
          <select
            name="recipeId"
            value={form.recipeId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">End Time</label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
