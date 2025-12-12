import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/Auth/AuthApi";
import { loginSuccess } from "../features/Auth/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await loginUser({ username, password });
      
      // Store token and user info
      dispatch(loginSuccess({ 
        token: data.token, 
        user: { username, id: data.user?.id } 
      }));
      
      // Navigate to home
      navigate("/home");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error("Error during login:", err);
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
          <h2 className="text-5xl text-white font-primary mb-12 tracking-wide">LOGIN</h2>

          <div className="w-full space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className="text-white font-primary text-xl pl-1">
                UserName
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-white font-primary text-xl pl-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter you password"
              />
              <div className="flex justify-end pt-1">
                <a href="/forgetPassword" className="text-white text-sm hover:underline">
                  Forget Password
                </a>
              </div>
            </div>

            {error && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center space-y-4 mt-8">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-gray-100 text-[#004aad] font-bold py-2 px-12 rounded-xl hover:bg-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                onClick={() => navigate('/admin')}
                className="bg-gray-800 text-white font-bold py-2 px-8 rounded-xl hover:bg-gray-700 transition-colors shadow-lg text-sm"
              >
                Admin (Temp)
              </button>

              <div className="flex flex-col items-center space-y-1">
                <p className="text-white text-sm">Don't have an account ?</p>
                <a href="/Signup" className="text-white text-xl font-primary tracking-wider hover:underline">
                  SINGUP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
