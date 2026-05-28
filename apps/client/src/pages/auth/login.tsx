import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import loginBg from "@/assets/auth/LoginArt.jpg";
import logoImg from "@/assets/Logo1.svg";
import { useLogin } from "@/hooks/auth/useLogin";
import { getErrorMessage } from "@/lib/errors";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
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
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      await loginMutation.mutateAsync({ email: email.trim(), password });
      const returnUrl = searchParams.get("returnUrl");
      navigate(returnUrl ? decodeURIComponent(returnUrl) : "/members");
    } catch (error) {
      setErrors({ general: getErrorMessage(error, "Sign in failed. Please check your credentials.") });
    }
  };

  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 bg-white overflow-y-auto">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Today is a new day. It&apos;s your day. You shape it.<br />
            Sign in to start managing your projects.
          </p>

          {errors.general && (
            <div className="mb-5 px-4 py-3 rounded bg-red-50 border border-red-200 flex items-center gap-2">
              <i className="ri-error-warning-line text-red-500 text-base flex-shrink-0" />
              <p className="text-red-600 text-xs">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="eg. kweku@gmail.com"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full border rounded px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-colors ${
                  errors.email ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#1a7fa8]"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line" /> {errors.email}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full border rounded px-3 py-2.5 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.password ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-[#1a7fa8]"
                  }`}
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

            <div className="flex justify-end mb-6 mt-2">
              <Link to="/forgot-password" className="text-sm text-[#1a7fa8] hover:underline cursor-pointer">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-[#1a7fa8] text-white py-3 text-sm font-semibold tracking-widest uppercase rounded cursor-pointer hover:bg-[#166a8f] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t you have an account?{" "}
            <Link to="/signup" className="text-[#1a7fa8] hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
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
