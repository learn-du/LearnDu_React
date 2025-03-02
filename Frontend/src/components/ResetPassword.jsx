import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`https://learndu-services-backend.onrender.com/api/users/reset-password/${token}`, {
        newPassword,
        confirmNewPassword,
      });

      setMessage(response.data.message);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-yellow">Reset Your Password</h2>

        {message && <p className="text-green-600 text-center mt-3">{message}</p>}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <form onSubmit={handleResetPassword} className="mt-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-black rounded mt-2 bg-white text-black"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border border-black rounded mt-2  bg-white text-black"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />

          <button
            className="w-full bg-yellow text-white p-2 rounded mt-4 flex items-center justify-center hover:bg-grey hover:text-yellow transition-colors"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
