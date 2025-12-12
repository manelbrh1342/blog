import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/Auth/AuthApi";
import { loginSuccess } from "../features/Auth/AuthSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password || !confirmPass) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await signupUser({ email, username, password });
      
      // Store token and user info
      dispatch(loginSuccess({ 
        token: data.token, 
        user: { username, email, id: data.user?.id } 
      }));
      
      // Navigate to home
      navigate("/home");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setError(errorMessage);
      console.error("Error during signup:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - White */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-[#004aad] rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-primary text-5xl">B</span>
          </div>
          <h1 className="text-4xl text-[#004aad] font-primary mb-2">
            Blog collaboratif
          </h1>
          <p className="text-gray-600 text-center font-medium">
            Plus que des mots
          </p>
          <p className="text-gray-600 text-center text-sm mt-1 max-w-xs">
            connectez-vous pour vivre l'expérience blog complète.
          </p>
        </div>
      </div>

      {/* Right Side - Blue with Diagonal Cut */}
      <div
        className="flex-[1.5] bg-[#004aad] flex flex-col justify-center items-center relative"
        style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <div className="w-full max-w-md px-8 flex flex-col items-center">
          <h2 className="text-5xl text-white font-primary mb-8 tracking-wide">SIGNUP</h2>

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-white font-primary text-xl pl-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="username" className="text-white font-primary text-xl pl-1">
                UserName
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-white font-primary text-xl pl-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your Password"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="confirm-pass" className="text-white font-primary text-xl pl-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-pass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex flex-col items-center space-y-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-100 text-[#004aad] font-bold py-2 px-12 rounded-xl hover:bg-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing up..." : "SignUp"}
              </button>

              <div className="flex flex-col items-center space-y-1">
                <p className="text-white text-sm">Already have an account?</p>
                <a href="/login" className="text-white text-xl font-primary tracking-wider hover:underline">
                  LOGIN
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
