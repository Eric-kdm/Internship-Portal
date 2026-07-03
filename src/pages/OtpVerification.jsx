import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelopeOpenText, FaEdit } from "react-icons/fa";

function OtpVerification() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(54);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    // NOTE: The backend doesn't have OTP/password-reset endpoints yet
    // (only /api/auth/register and /api/auth/login exist). This screen
    // is UI-complete but not wired to a real verification call — it
    // moves you forward so the flow can be reviewed end-to-end.
    navigate("/reset-password");
  };

  const handleResend = () => {
    setTimer(54);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <header className="flex justify-between items-center px-10 py-8">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>

        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <button onClick={() => navigate("/help-center")} className="hover:text-blue-600 transition">Help Center</button>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-[32px] shadow-lg p-10 md:p-14">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FaEnvelopeOpenText className="text-blue-600 text-3xl" />
              </div>
            </div>

            <h2 className="text-5xl font-bold text-center mb-4">
              Check your inbox
            </h2>

            <p className="text-center text-gray-500 mb-4">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-bold text-black">
                {localStorage.getItem("pendingResetEmail") || "your email address"}
              </span>
            </p>

            <div className="text-center mb-8">
              <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
                Demo mode — email verification isn't connected yet
              </span>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center">
                {error}
              </div>
            )}

            {/* OTP Boxes */}
            <div className="flex justify-center gap-3 mb-10">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-16 md:w-16 md:h-20 text-center text-3xl font-bold bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-4 rounded-full bg-blue-700 text-white text-lg font-bold hover:bg-blue-800 hover:scale-[1.02] transition-all"
            >
              Verify Account
            </button>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">Didn't receive a code?</p>

              {timer > 0 ? (
                <button disabled className="text-blue-400 font-semibold mt-1">
                  Resend (0:{timer.toString().padStart(2, "0")})
                </button>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 mx-auto text-blue-600 font-semibold hover:underline"
              >
                <FaEdit />
                Change email or number
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 px-10 border-t mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">InternHub</h3>
            <p className="text-gray-500 text-sm">
              © 2026 InternHub. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-gray-500 text-sm">
            <button onClick={() => navigate("/privacy-policy")}>Privacy</button>
            <button onClick={() => navigate("/terms")}>Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OtpVerification;
