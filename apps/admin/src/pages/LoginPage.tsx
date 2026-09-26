import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminApi } from "@/api/admin.api";
import { tokenStorage } from "@joe-wilson/shared/lib/token-storage";
import { getErrorMessage } from "@joe-wilson/shared/lib/errors";
import loginArt from "../../../client/src/assets/auth/LoginArt.jpg";
import logo from "@/assets/Logo1.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await adminApi.login(email.trim(), password);
      if (result.user.role !== "admin") throw new Error("This account does not have administrator access.");
      tokenStorage.setTokens(result.accessToken, result.refreshToken);
      const target = params.get("returnUrl");
      navigate(target?.startsWith("/admin") ? target : "/admin/dashboard");
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setPending(false);
    }
  }

  return <main className="flex min-h-screen w-full bg-white">
    <section className="flex w-full flex-col justify-center overflow-y-auto bg-white px-6 py-12 sm:px-10 md:w-1/2 md:px-16">
      <form onSubmit={submit} className="mx-auto w-full max-w-sm">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a7fa8]">Joseph Wilson</p>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Admin Portal</h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-500">Sign in to manage website content, masterclasses, customers, and payments.</p>
        {error && <div role="alert" className="mb-5 flex items-center gap-2 rounded border border-red-200 bg-red-50 px-4 py-3"><i className="ri-error-warning-line text-base text-red-500"/><p className="text-xs text-red-600">{error}</p></div>}
        <label className="mb-5 block text-xs font-semibold uppercase tracking-widest text-gray-700">Email
          <input type="email" required autoComplete="email" placeholder="eg. admin@example.com" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded border border-gray-300 px-3 py-2.5 text-sm normal-case tracking-normal text-gray-700 placeholder:text-gray-400 focus:border-[#1a7fa8] focus:outline-none"/>
        </label>
        <label className="mb-7 block text-xs font-semibold uppercase tracking-widest text-gray-700">Password
          <div className="relative mt-2"><input type={showPassword ? "text" : "password"} required autoComplete="current-password" placeholder="Enter your password" value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded border border-gray-300 px-3 py-2.5 pr-10 text-sm normal-case tracking-normal text-gray-700 placeholder:text-gray-400 focus:border-[#1a7fa8] focus:outline-none"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
        </label>
        <button disabled={pending} className="w-full rounded bg-[#1a7fa8] py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#166a8f] disabled:cursor-not-allowed disabled:opacity-70">{pending ? "Signing In..." : "Sign In"}</button>
      </form>
    </section>
    <aside className="relative hidden w-1/2 overflow-hidden md:block"><img src={loginArt} alt="Joseph Wilson" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-black/35"/><div className="absolute inset-0 flex items-center justify-center"><img src={logo} alt="Joseph Wilson" className="w-80 object-contain"/></div><p className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Administration workspace</p></aside>
  </main>;
}
