import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgetPassword = async () => {
    if (!email) {
      alert("Please enter your email or username");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5002/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error during request");
        return;
      }

      setMessage(data.message || "Reset email sent!");
    } catch (error) {
      console.error("Error:", error);
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
            Entrez votre email
          </p>
          <p className="text-gray-600 text-center text-sm mt-1 max-w-xs">
            pour réinitialiser votre mot de passe.
          </p>
        </div>
      </div>

      {/* Right Side - Blue with Diagonal Cut */}
      <div
        className="flex-[1.5] bg-[#004aad] flex flex-col justify-center items-center relative"
        style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <div className="w-full max-w-md px-8 flex flex-col items-center">
          <h2 className="text-5xl text-white font-primary mb-12 tracking-wide text-center">FORGOT PASSWORD</h2>

          <div className="w-full space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-white font-primary text-xl pl-1">
                Email or Username
              </label>
              <input
                type="text"
                className="w-full bg-white rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {message && (
              <p className="text-green-300 text-sm text-center font-medium">{message}</p>
            )}

            <div className="flex flex-col items-center space-y-4 mt-8">
              <button
                onClick={handleForgetPassword}
                className="bg-gray-100 text-[#004aad] font-bold py-2 px-12 rounded-xl hover:bg-white transition-colors shadow-lg"
              >
                Send Code
              </button>

              <div className="flex flex-col items-center space-y-1">
                <a href="/login" className="text-white text-xl font-primary tracking-wider hover:underline">
                  BACK TO LOGIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
