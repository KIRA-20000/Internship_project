import { useState } from "react";
import "./logIn.css";

import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api/axios";
export default function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    () => localStorage.getItem("rememberedEmail") || "",
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() =>
    Boolean(localStorage.getItem("rememberedEmail")),
  );
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email.trim());
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.user?.role || "student");
      window.dispatchEvent(new Event("userRoleChanged"));

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password.");
    }
  }

  return (
    <>
      <motion.div
        className="container cont3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className="sign-form p-4 center bg-white" onSubmit={handleSubmit}>
          <h2 className="text-center">Log In</h2>

          <p className="text-center text-secondary">
            Welcome Back! Please log in to your account.
          </p>

          <div className="mb-3">
            <label htmlFor="email" className="form-label mb-0">
              Email
            </label>

            <div className="input-icon">
              <FaEnvelope />

              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label mb-0">
              Password
            </label>

            <div className="input-icon">
              <FaLock />

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="form-check forget my-2">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                id="check"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />

              <label className="form-check-label" htmlFor="check">
                Remember Me
              </label>
            </div>
          </div>

          <input
            type="submit"
            className="form-control mb-3"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
            }}
            value="Log in"
          />

          <p className="text-center text-secondary">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-decoration-none"
              style={{ color: "#7c3aed" }}
            >
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </>
  );
}
