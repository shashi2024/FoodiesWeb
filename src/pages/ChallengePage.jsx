import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChallengePage() {
  const [challenges, setChallenges] = useState([]);
  const [recipes, setRecipes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/challenges/user123").then(res => setChallenges(res.data));
    axios.get("/api/recipes").then(res => {
      const map = {};
      res.data.forEach(r => map[r.id] = r);
      setRecipes(map);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      await axios.delete(`/api/challenges/${id}`);
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Your Challenges</h2>
        <Link to="/video-selection" className="bg-green-500 text-white px-4 py-2 rounded">New Challenge</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="px-6 py-3">Recipe</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Start</th>
              <th className="px-6 py-3">End</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 border-t">
                <td className="px-6 py-3">{recipes[c.recipeId]?.title || "Loading..."}</td>
                <td className="px-6 py-3">{c.date}</td>
                <td className="px-6 py-3">{c.startTime}</td>
                <td className="px-6 py-3">{c.endTime}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => navigate(`/challenge/${c.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/update-challenge/${c.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
