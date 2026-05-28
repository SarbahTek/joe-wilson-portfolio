import { useState } from "react";
import { Link } from "react-router-dom";
import loginBg from "@/assets/auth/LoginArt.jpg";
import logoImg from "@/assets/Logo1.svg";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { getErrorMessage } from "@/lib/errors";

export default function ForgotPassword() {
  const forgotPasswordMutation = useForgotPassword();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    try {
      await forgotPasswordMutation.mutateAsync({ email: email.trim() });
      setSuccess(true);
    } catch (submitError) {
      setError(getErrorMessage(submitError, "Unable to send reset email. Please try again."));
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (submitted) setError("");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 bg-white overflow-y-auto">
        <div className="max-w-sm w-full mx-auto">

          {success ? (
            /* Success state */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#e6f5fb] flex items-center justify-center mx-auto mb-6">
                <i className="ri-mail-send-line text-[#1a7fa8] text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Check Your Inbox</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                We&apos;ve sent a password reset link to<br />
                <span className="font-semibold text-gray-700">{email}</span>.<br />
                Check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-gray-500">
                Didn&apos;t receive it?{" "}
                <button
                  onClick={() => { setSuccess(false); setSubmitted(false); setEmail(""); }}
                  className="text-[#1a7fa8] hover:underline cursor-pointer"
                >
                  Try again
                </button>
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="ri-arrow-left-line" /> Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Form state */
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-8 cursor-pointer"
              >
                <i className="ri-arrow-left-line" /> Back to Sign In
              </Link>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                No worries. Enter your email and we&apos;ll send you<br />
                a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="eg. kweku@gmail.com"
                    value={email}
                    onChange={(e) => handleChange(e.target.value)}
                    className={`w-full border rounded px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-colors ${
                      error ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#1a7fa8]"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <i className="ri-error-warning-line" /> {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={forgotPasswordMutation.isPending}
                  className="w-full bg-[#1a7fa8] text-white py-3 text-sm font-semibold tracking-widest uppercase rounded cursor-pointer hover:bg-[#166a8f] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Remember your password?{" "}
                <Link to="/login" className="text-[#1a7fa8] hover:underline cursor-pointer">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img
          src={loginBg}
          alt="Joseph Wilson"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logoImg}
            alt="JosephWilson Logo"
            className="w-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
