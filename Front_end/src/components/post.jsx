import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

import googleLogo from "../assets/google-removebg-preview.png";
import amazonLogo from "../assets/amazone.png";
import microsoftLogo from "../assets/amazone-removebg-preview.png";
import defaultLogo from "../assets/briefcase-solid.png";

import "./post.css";

const normalizeCompanyName = (value = "") => {
  return String(value).trim().toLowerCase();
};

const getCompanyLogo = (companyName) => {
  const name = normalizeCompanyName(companyName);

  if (name === "amazon" || name === "amazone") {
    return amazonLogo;
  }

  if (name === "google") {
    return googleLogo;
  }

  if (name === "microsoft") {
    return microsoftLogo;
  }

  return defaultLogo;
};

export default function Post() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in as a company before posting an internship.");
      navigate("/login");
      return;
    }

    if (role !== "company") {
      alert("Only companies can post internships.");
      navigate("/");
      return;
    }

    const getCategories = async () => {
      try {
        const response = await api.get("/categories");

        console.log("Categories:", response.data);

        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in as a company before posting an internship.");

      navigate("/login");

      return;
    }

    const companyName = String(formData.get("company") || "").trim();

    const location = String(formData.get("location") || "").trim();

    const duration = formData.get("duration");

    const internshipData = {
      title: formData.get("title"),

      description: formData.get("description"),

      company: companyName,

      logo: getCompanyLogo(companyName),

      category: formData.get("category"),

      location: location,

      duration: `${duration} Months`,

      type: formData.get("type"),

      remote: location.toLowerCase().includes("remote"),

      requirements: String(formData.get("requirements") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      skills: String(formData.get("skills") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      deadline: formData.get("deadline") || "",

      howToApply: formData.get("howToApply") || "",
    };

    console.log("Sending internship data:", internshipData);

    try {
      const response = await api.post("/internships", internshipData);

      console.log("Internship posted successfully:", response.data);

      alert("Internship posted successfully!");

      navigate("/internships");
    } catch (error) {
      console.error("FULL ERROR:", error);

      console.error("SERVER ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to post internship",
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
        <form
          className="sign-form p-4 center bg-white post-form"
          onSubmit={handleSubmit}
        >
          <h2>Post an Internship</h2>

          <p className="text-secondary">
            Fill in the details below to post a new internship opportunity.
          </p>

          <hr />

          {/* Internship Title */}

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Internship Title
            </label>

            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              placeholder="e.g. Frontend Developer Intern"
            />
          </div>

          {/* Company */}

          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company/Department
            </label>

            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              required
              placeholder="e.g. Web Development Team"
            />
          </div>

          {/* Location */}

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>

            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              required
              placeholder="e.g. Cairo, Egypt / Remote"
            />
          </div>

          {/* Category */}

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>

            <select
              id="category"
              name="category"
              className="form-select"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Category
              </option>

              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration
            </label>

            <select
              id="duration"
              name="duration"
              className="form-select"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Duration
              </option>

              <option value="3">3 Months</option>

              <option value="6">6 Months</option>

              <option value="9">9 Months</option>
            </select>
          </div>

          {/* Type */}

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>

            <select
              id="type"
              name="type"
              className="form-select"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Type
              </option>

              <option value="Full-time">Full-time</option>

              <option value="Part-time">Part-time</option>
            </select>
          </div>

          {/* Description */}

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <div className="input-icon">
              <FaInfoCircle />

              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                required
                placeholder="Describe the internship, responsibilities and what the intern will learn..."
              />
            </div>
          </div>

          {/* Requirements */}

          <div className="mb-3">
            <label htmlFor="requirements" className="form-label">
              Requirements
            </label>

            <div className="input-icon">
              <FaInfoCircle />

              <textarea
                className="form-control"
                id="requirements"
                name="requirements"
                rows="3"
                placeholder="Separate each requirement with a comma"
              />
            </div>
          </div>

          {/* Skills */}

          <div className="mb-3">
            <label htmlFor="skills" className="form-label">
              Required Skills
            </label>

            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              placeholder="e.g. React, JavaScript, Teamwork"
            />
          </div>

          {/* Deadline */}

          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">
              Application Deadline
            </label>

            <input
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
            />
          </div>

          {/* How To Apply */}

          <div className="mb-3">
            <label htmlFor="howToApply" className="form-label">
              How to Apply
            </label>

            <input
              type="text"
              className="form-control"
              id="howToApply"
              name="howToApply"
              placeholder="e.g. Send your CV to careers@company.com"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="form-control mb-3"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
            }}
          >
            Post Internship
          </button>
        </form>
      </motion.div>
    </>
  );
}
