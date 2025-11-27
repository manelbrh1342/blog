import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour envoyer la connexion vers le backend Flask
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      alert("Login successful!");
      console.log("User logged:", data);

      // Exemple si tu veux sauvegarder le token plus tard :
      // localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Server error");
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
                className="bg-gray-100 text-[#004aad] font-bold py-2 px-12 rounded-xl hover:bg-white transition-colors shadow-lg"
              >
                Login
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
