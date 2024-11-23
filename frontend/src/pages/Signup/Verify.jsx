import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { checkEmailVerification } from "../../services/service";

function Verify() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const info = JSON.parse(localStorage.getItem("info"));

  const handleVerification = async () => {
    setLoading(true);
    try {
      const resp = await checkEmailVerification(info?.token);
      const user = resp.users[0];

      if (!user.emailVerified) throw new Error("Email is not verified!");

      if (user.emailVerified) {
        console.log("Email verified");
        localStorage.removeItem("info");
        login({ UID: user.localId, uname: info.uname });
        setIsVerified(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (isVerified) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md w-full">
          <div className="text-green-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Verification Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your email has been verified. Redirecting you in 3s
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md w-full">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent you a verification email. Please check your inbox and
          click the verification link.
        </p>
        <button
          onClick={handleVerification}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Done, I have verified!
        </button>
      </div>
    </div>
  );
}

export default Verify;
