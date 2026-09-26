import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { getErrorMessage } from "@/lib/errors";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!token || pending) return;
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError("Use at least 8 characters, including uppercase, lowercase, and a number.");
      return;
    }
    if (password !== confirmation) { setError("Passwords do not match."); return; }
    setPending(true);
    setError("");
    try {
      await authApi.resetPassword({ token, password });
      setDone(true);
    } catch (error) { setError(getErrorMessage(error)); }
    finally { setPending(false); }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
        {done ? <p role="status">Your password has been updated. You can now sign in.</p> : !token ? (
          <p>This reset link is missing its token. <Link className="text-[#1a7fa8] underline" to="/forgot-password">Request a new link</Link>.</p>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <label className="block">New password
              <input autoComplete="new-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="block w-full border p-3 mt-2" />
            </label>
            <label className="block">Confirm password
              <input autoComplete="new-password" type="password" required value={confirmation} onChange={e => setConfirmation(e.target.value)} className="block w-full border p-3 mt-2" />
            </label>
            <button disabled={pending} className="w-full bg-[#1a7fa8] text-white p-3 disabled:opacity-50">{pending ? "Updating..." : "Update password"}</button>
          </form>
        )}
        <Link to="/login" className="block mt-6 text-[#1a7fa8]">Back to sign in</Link>
      </div>
    </main>
  );
}
