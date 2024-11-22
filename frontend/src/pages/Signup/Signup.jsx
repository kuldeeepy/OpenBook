import React, { useState } from "react";
import {
  SendVerificationMail,
  SignupWithEmailPwd,
} from "../../services/service.jsx";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const resp = await SignupWithEmailPwd(name, email, pwd);
      localStorage.setItem("token", JSON.stringify(resp.idToken));
      setTimeout(() => {
        SendVerificationMail(resp.idToken);
        navigate("/verify");
      }, 600);
    } catch (error) {
      setLoading(false);
      console.error(`Error: ${error}`);
    }

    setName("");
    setEmail("");
    setPwd("");
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
          <h2 className="text-2xl text-center mb-6 font-bold">Sign Up</h2>
          <div className="flex flex-col">
            <label htmlFor="uname" className="text-lg mb-2">
              Username
            </label>
            <input
              id="uname"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 border rounded-lg mb-4 text-base"
            />
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
              onClick={handleSignup}
              className="bg-gray-800 text-white font-semibold py-2 rounded-lg mt-4 w-full hover:bg-gray-700 transition"
            >
              Register
            </button>
          </div>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("../Login")}
              className="text-blue-600 cursor-pointer font-semibold hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
