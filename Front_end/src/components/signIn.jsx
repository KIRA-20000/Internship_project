import { useState } from "react";
import "./signIn.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaTools,
  FaFileAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api/axios";
export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    number: "",
    email: "",
    pass1: "",
    pass2: "",
    university: "",
    skill: "",
    info: "",
    companyName: "",
    companyWebsite: "",
    companyIndustry: "",
  });

  const [error, setError] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvFile, setCvFile] = useState(null);

  function handleChange(event) {
    const { id, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [id]: value,
    }));
  }
  const [accountType, setAccountType] = useState("student");
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      if (accountType === "company") {
        if (
          !formData.companyName ||
          !formData.email ||
          !formData.pass1 ||
          !formData.pass2
        ) {
          setError("Please fill in all required company fields.");
          return;
        }
      } else if (
        !formData.first ||
        !formData.last ||
        !formData.email ||
        !formData.pass1 ||
        !formData.pass2
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      if (formData.pass1 !== formData.pass2) {
        setError("Passwords do not match.");
        return;
      }

      const displayName =
        accountType === "company"
          ? formData.companyName
          : `${formData.first} ${formData.last}`;

      await api.post("/auth/register", {
        name: displayName,
        email: formData.email,
        password: formData.pass1,
        role: accountType,
        phone: formData.number || "",
        education: formData.university || "",
        skills: formData.skill
          ? formData.skill
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [],
        aboutMe: formData.info || "",
        companyName: formData.companyName || "",
        companyWebsite: formData.companyWebsite || "",
        companyIndustry: formData.companyIndustry || "",
      });

      if (accountType === "student" && cvName) {
        const loginResponse = await api.post("/auth/login", {
          email: formData.email,
          password: formData.pass1,
        });

        const token = loginResponse.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", "student");
        window.dispatchEvent(new Event("userRoleChanged"));

        const uploadData = new FormData();
        uploadData.append("cv", cvFile);

        await api.post("/users/profile/cv", uploadData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      localStorage.setItem(
        "internhubProfile",
        JSON.stringify({
          name: displayName,
          email: formData.email,
          phone: formData.number || "",
          university: formData.university || "",
          skills: formData.skill
            ? formData.skill
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [],
          aboutMe: formData.info || "",
          cvName: cvName || "",
        }),
      );

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  }
  return (
    <>
      <motion.div
        className="container cont4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className="sign-form p-4 bg-white" onSubmit={handleSubmit}>
          <h2 className="text-center">Create Account</h2>

          <p className="text-center text-secondary">
            Fill in your details to create your account.
          </p>

          {error && <p className="text-danger text-center">{error}</p>}

          {accountType === "company" ? (
            <div className="mb-3">
              <label htmlFor="companyName">Company Name</label>

              <div className="input-icon">
                <FaUser />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Company name"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="row g-3">
              <div className="col mb-3">
                <label htmlFor="first">First Name</label>

                <div className="input-icon">
                  <FaUser />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    id="first"
                    value={formData.first}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col mb-3">
                <label htmlFor="last">Last Name</label>

                <div className="input-icon">
                  <FaUser />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    id="last"
                    value={formData.last}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="number" className="form-label mb-0">
              Phone Number
            </label>

            <div className="input-icon">
              <FaPhone />

              <input
                type="tel"
                className="form-control"
                id="number"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col mb-3">
              <label htmlFor="pass1">Password</label>

              <div className="input-icon">
                <FaLock />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  id="pass1"
                  value={formData.pass1}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col mb-3">
              <label htmlFor="pass2">Confirm Password</label>

              <div className="input-icon">
                <FaLock />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  id="pass2"
                  value={formData.pass2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {accountType === "company" ? (
            <>
              <div className="mb-3">
                <label htmlFor="companyWebsite">Company Website</label>
                <input
                  type="url"
                  className="form-control"
                  id="companyWebsite"
                  placeholder="https://yourcompany.com"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="companyIndustry">Industry</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyIndustry"
                  placeholder="Technology, Marketing, Design..."
                  value={formData.companyIndustry}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <label htmlFor="university">University</label>

              <select
                id="university"
                className="form-select mb-3"
                value={formData.university}
                onChange={handleChange}
              >
                <option value="">Select your university</option>
                <option value="Benha University">Benha University</option>
                <option value="Cairo University">Cairo University</option>
                <option value="Alexandria University">
                  Alexandria University
                </option>
              </select>

              <div className="mb-1">
                <label htmlFor="skill" className="form-label mb-0">
                  Skills
                </label>

                <div className="input-icon">
                  <FaTools />

                  <input
                    type="text"
                    className="form-control"
                    id="skill"
                    placeholder="Enter your skills"
                    value={formData.skill}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <p className="text-secondary">Separate skills with commas.</p>

              <div className="mb-3">
                <label htmlFor="cv" className="form-label mb-0">
                  CV/Resume
                </label>

                <div className="input-icon">
                  <FaFileAlt />

                  <input
                    className="form-control"
                    type="file"
                    id="cv"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setCvFile(file);
                      setCvName(file?.name || "");
                    }}
                  />
                </div>

                {cvName && (
                  <small className="text-success d-block mt-2">
                    Selected CV: {cvName}
                  </small>
                )}
              </div>
            </>
          )}

          <div className="mb-3">
            <label htmlFor="info" className="form-label mb-0">
              About Me
            </label>

            <div className="input-icon">
              <FaInfoCircle />

              <textarea
                className="form-control"
                id="info"
                rows="3"
                placeholder="Tell us about yourself, your experience and career goals"
                value={formData.info}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Account Type</label>

            <select
              className="form-select"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>
          <input
            type="submit"
            className="form-control mb-3"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
            }}
            value="Create account"
          />

          <p className="text-center text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none"
              style={{ color: "#7c3aed" }}
            >
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </>
  );
}
