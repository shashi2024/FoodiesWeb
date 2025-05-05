

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ChallengePage() {
  const [challenges, setChallenges] = useState([]);
  const userId = "user123"; // Replace with dynamic user ID from auth context

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`/api/challenges/${userId}`);
      setChallenges(res.data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      await axios.delete(`/api/challenges/${id}`);
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleRestart = async (id) => {
    await axios.put(`/api/challenges/${id}/restart`);
    fetchChallenges();
  };

  const handleFinish = async (id) => {
    const uploadedImages = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    await axios.put(`/api/challenges/${id}/finish`, uploadedImages);
    fetchChallenges();
  };

  const handlePause = async (id) => {
    await axios.put(`/api/challenges/${id}/pause`);
    fetchChallenges();
  };

  

  return (
    <div className="p-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Your Challenges</h2>
        <Link
          to="/video-selection"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + New Challenge
        </Link>
      </div>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-500">No challenges found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">End Time</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="border-b hover:bg-blue-50">
                  <td className="p-3 font-semibold">{challenge.title}</td>
                  <td className="p-3">{challenge.description}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        challenge.status === "Completed"
                          ? "bg-green-500"
                          : challenge.status === "Paused"
                          ? "bg-yellow-500"
                          : challenge.status === "Quit"
                          ? "bg-red-500"
                          : "bg-blue-600"
                      }`}
                    >
                      {challenge.status}
                    </span>
                  </td>
                  <td className="p-3">{challenge.date}</td>
                  <td className="p-3">{challenge.startTime}</td>
                  <td className="p-3">{challenge.endTime}</td>
                  <td className="p-3 space-x-1 flex flex-wrap gap-1">
                    <button
                      onClick={() => handleFinish(challenge.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Finish
                    </button>
                    <button
                      onClick={() => handlePause(challenge.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => handleRestart(challenge.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Restart
                    </button>
                    <button
                      onClick={() => handleDelete(challenge.id)}
                      className="bg-black-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(challenge.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
