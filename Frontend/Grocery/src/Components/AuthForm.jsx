import React, { useState } from "react";
import { signup, login, verifyOTP, forgotPassword, resetPassword } from "../api/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import { Success, Error } from "../Utils/toastUtils.js";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", otp: "" });
  const [awaitingOTP, setAwaitingOTP] = useState(false);
  const [forgotOTPStage, setForgotOTPStage] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (awaitingOTP) {
        const res = await verifyOTP({ email: formData.email, otp: formData.otp });
        Success(res.data.message);
        const loginRes = await login({ email: formData.email, password: formData.password });
        dispatch(loginUser({ user: loginRes.data.user, token: loginRes.data.token }));
        setAwaitingOTP(false);
        navigate("/");
      } else if (mode === "signup") {
        await signup(formData);
        Success("OTP sent to your email.");
        setAwaitingOTP(true);
      } else if (mode === "login") {
        const res = await login(formData);
        dispatch(loginUser({ user: res.data.user, token: res.data.token }));
        Success(`Welcome back, ${res.data.user.name}!`);
        if (res.data.user.is_admin) navigate("/admin-dashboard");
        else if (res.data.user.role === "seller") navigate("/seller-dashboard");
        else navigate("/");
      } else if (mode === "forgot") {
        if (!forgotOTPStage) {
          await forgotPassword(formData.email);
          Success("OTP sent to your email.");
          setForgotOTPStage(true);
        } else {
          await resetPassword({ email: formData.email, otp: formData.otp, new_password: newPassword });
          Success("Password reset successful!");
          setForgotOTPStage(false);
          setMode("login");
          setNewPassword("");
          setFormData((prev) => ({ ...prev, otp: "" }));
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong.";
      setMessage(errorMsg);
      Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-white transition-all text-sm";

  const renderFormFields = () => {
    if (awaitingOTP) {
      return <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className={inputClass} required />;
    }
    if (mode === "forgot") {
      return (
        <>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className={inputClass} required />
          {forgotOTPStage && (
            <>
              <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className={inputClass} required />
              <input type="password" name="newPassword" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} required />
            </>
          )}
        </>
      );
    }
    return (
      <>
        {mode === "signup" && <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass} required />}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputClass} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputClass} required />
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--surface-cream)' }}>
      <div className="bg-white dark:bg-surface-dark-gray p-8 sm:p-10 rounded-[2rem] shadow-glass-lg w-full max-w-md border border-gray-100 dark:border-gray-800">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-warm">
            <ShoppingBag className="text-white" size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {awaitingOTP ? "Verify OTP" : mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {awaitingOTP ? "Enter the code sent to your email" : mode === "login" ? "Sign in to your EcoBazzar account" : mode === "signup" ? "Join EcoBazzar today" : "We'll send you a recovery code"}
          </p>
        </div>

        {message && (
          <div className="mb-4 text-center text-sm text-brand-700 dark:text-brand-400 font-medium bg-brand-50 dark:bg-brand-950/20 px-4 py-2.5 rounded-xl">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
              loading
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-warm hover:shadow-warm-lg active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin" />
                {awaitingOTP ? "Verifying..." : mode === "login" ? "Signing in..." : "Sending..."}
              </span>
            ) : (
              <>{awaitingOTP ? "Verify OTP" : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send OTP"}</>
            )}
          </button>
        </form>

        {!awaitingOTP && (
          <div className="text-center mt-6 space-y-2">
            {mode !== "forgot" && (
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-brand-600 dark:text-brand-400 hover:underline text-sm font-semibold">
                {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            )}
            <div>
              {mode === "forgot" ? (
                <button onClick={() => setMode("login")} className="text-gray-500 hover:underline text-sm">Back to Login</button>
              ) : (
                <button onClick={() => setMode("forgot")} className="text-gray-400 hover:text-brand-500 hover:underline text-sm transition-colors">Forgot Password?</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
