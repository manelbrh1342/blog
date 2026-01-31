import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check specific admin credentials first
    if (username === "admin" && password === "admin123") {
      const adminData = {
        token: "admin-token-secret",
        user: { username: "admin", role: "admin" }
      };
      localStorage.setItem("token", adminData.token);
      localStorage.setItem("user", JSON.stringify(adminData.user));
      window.dispatchEvent(new Event("storage"));
      navigate('/admin');
      return;
    }

    // Default User Login (Bypass Backend)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockData = {
        token: "mock-token-12345",
        user: { username: username, role: "user" }
      };

      console.log("User logged via Mock:", mockData);
      localStorage.setItem("token", mockData.token);
      localStorage.setItem("user", JSON.stringify(mockData.user));

      // Dispatch storage event so useAuth hook picks it up immediately
      window.dispatchEvent(new Event("storage"));

      alert("Login successful!");
      navigate('/home'); // Redirect to Home
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong");
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

            <div className="flex flex-col items-center space-y-4 mt-8">
              <button
                onClick={handleLogin}
                className="bg-white text-[#004aad] font-bold py-3 px-12 rounded-xl hover:bg-gray-50 transition-colors shadow-lg border-2 border-transparent hover:border-white/50"
              >
                Login
              </button>

              <div className="mt-8 pt-6 border-t border-white/20 w-full text-center">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#004aad] p-1.5 rounded-full shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">Expert/Admin Mode</p>
                      <p className="text-blue-100 text-xs leading-relaxed mb-2">
                        To access the admin dashboard and manage content, please use these credentials:
                      </p>
                      <div className="bg-[#003d82]/50 rounded px-2 py-1 inline-flex gap-3 text-xs text-blue-50 font-mono">
                        <span>user: <strong className="text-white">admin</strong></span>
                        <span>pass: <strong className="text-white">admin123</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
