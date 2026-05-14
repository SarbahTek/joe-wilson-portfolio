import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "@/assets/auth/LoginArt.jpg";
import logoImg from "@/assets/Logo1.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // Mock auth — navigate to members area
    navigate("/members");
  };

  const clearError = (field: keyof typeof errors) => {
    if (submitted) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const fieldClass = (error?: string) =>
    `w-full border rounded px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-colors ${
      error ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#1a7fa8]"
    }`;

  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Join Us</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Today is a new day. It&apos;s your day. You shape it.<br />
            Sign up to start your journey.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* First & Last Name */}
            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
                  className={fieldClass(errors.firstName)}
                />
                {errors.firstName && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="ri-error-warning-line" /> {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
                  className={fieldClass(errors.lastName)}
                />
                {errors.lastName && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="ri-error-warning-line" /> {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="eg. kweku@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                className={fieldClass(errors.email)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                  className={fieldClass(errors.password) + " pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className={`text-base ${showPassword ? "ri-eye-off-line" : "ri-eye-line"}`} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line" /> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
                  className={fieldClass(errors.confirmPassword) + " pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className={`text-base ${showConfirm ? "ri-eye-off-line" : "ri-eye-line"}`} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a7fa8] text-white py-3 text-sm font-semibold tracking-widest uppercase rounded cursor-pointer hover:bg-[#166a8f] transition-colors whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1a7fa8] hover:underline cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 relative overflow-hidden">
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
