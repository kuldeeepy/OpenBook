import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from ".././../context/AuthContext";
import { LoginWithEmailPwd } from "../../services/service";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await LoginWithEmailPwd(email, pwd);
      login({ UID: userData.localId, email: userData.email });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      <div
        className={`min-h-screen bg-gray-100 flex justify-center items-center 
      ${loading ? "filter blur-sm pointer-events-none" : ""}`}
      >
        <div className="p-6 border rounded-lg shadow-lg bg-white max-w-md w-full">
          <h2 className="text-2xl text-center mb-6 font-bold">Login</h2>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded-lg mb-4 text-base"
            />
            <label htmlFor="pwd" className="text-lg mb-2">
              Password
            </label>
            <input
              id="pwd"
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="p-2 border rounded-lg mb-4 text-base"
            />
            <button
              onClick={handleLogin}
              className="bg-gray-800 text-white font-semibold py-2 rounded-lg mt-4 w-full hover:bg-gray-700 transition"
            >
              Login
            </button>
          </div>
          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
