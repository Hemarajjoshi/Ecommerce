import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(
        registerUser({
          username,
          email,
          password,
          phone_number: phoneNumber,
          confirm_password: confirmPassword
        })
      );

      if (response.payload && response.payload.user) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "You have been successfully registered. Redirecting to login page...",
          confirmButtonText: "Ok",
          timer: 3000,
        }).then(() => {
          navigate("/signin", { replace: true });
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message || "An error occurred during signup. Please try again.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute top-[-10rem] left-[-10rem] w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-10 w-96 border border-white/20">
        <h2 className="text-3xl font-extrabold text-white text-center">Create Account</h2>
        {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
        
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-white/10 text-white border border-transparent rounded-xl focus:border-blue-400 outline-none transition-all duration-300 placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/10 text-white border border-transparent rounded-xl focus:border-blue-400 outline-none transition-all duration-300 placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/10 text-white border border-transparent rounded-xl focus:border-blue-400 outline-none transition-all duration-300 placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white/10 text-white border border-transparent rounded-xl focus:border-blue-400 outline-none transition-all duration-300 placeholder-gray-300"
              required
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 bg-white/10 text-white border border-transparent rounded-xl focus:border-blue-400 outline-none transition-all duration-300 placeholder-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg transition-transform duration-300 transform hover:scale-105 flex justify-center items-center shadow-lg hover:shadow-blue-600/50 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
