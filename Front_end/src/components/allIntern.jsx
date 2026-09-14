import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./allintern.css";
import "./allCat.css";

import api from "../api/axios";

import googleLogo from "../assets/google-removebg-preview.png";
import amazonLogo from "../assets/amazone.png";
import microsoftLogo from "../assets/amazone-removebg-preview.png";
import defaultLogo from "../assets/briefcase-solid.png";

const normalizeCompanyName = (value = "") => String(value).trim().toLowerCase();

const companyLogos = {
  "tech company": googleLogo,
  "creative studio": amazonLogo,
  "data labs": microsoftLogo,
  google: googleLogo,
  microsoft: microsoftLogo,
  amazon: amazonLogo,
  amazone: amazonLogo,
};

const getCompanyLogo = (internship) => {
  return (
    internship.logo ||
    companyLogos[normalizeCompanyName(internship.company)] ||
    defaultLogo
  );
};

export default function AllIntern() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [internships, setInternships] = useState([]);

  const [selectedInternship, setSelectedInternship] = useState(null);

  const searchValue = searchParams.get("search") || "";

  const selectedCategory = searchParams.get("category") || "all";

  const selectedLocation = searchParams.get("location") || "all";

  const selectedDuration = searchParams.get("duration") || "all";

  // =========================
  // Get Internships
  // =========================

  useEffect(() => {
    const getInternships = async () => {
      try {
        const response = await api.get("/internships", {
          params: {
            search: searchValue,
            category: selectedCategory,
            location: selectedLocation,
            duration: selectedDuration,
          },
        });

        console.log("Internships:", response.data);

        setInternships(response.data.internships || []);
      } catch (error) {
        console.error(
          "Error fetching internships:",
          error.response?.data || error,
        );
      }
    };

    getInternships();
  }, [searchValue, selectedCategory, selectedLocation, selectedDuration]);

  // =========================
  // Delete Internship
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/internships/${id}`);

      setInternships((prevInternships) =>
        prevInternships.filter((internship) => internship._id !== id),
      );

      alert("Internship deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting internship:",
        error.response?.data || error,
      );

      alert(error.response?.data?.message || "Failed to delete internship");
    }
  };

  // =========================
  // Update Filters
  // =========================

  const updateFilter = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        nextParams.delete(key);

        return;
      }

      nextParams.set(key, value);
    });

    setSearchParams(nextParams, {
      replace: true,
    });
  };

  // =========================
  // Normalize Filter
  // =========================

  const normalizeFilterValue = (value = "") =>
    String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");

  // =========================
  // Filter Internships
  // =========================

  const filteredInternships = internships.filter((internship) => {
    const normalizedSearch = normalizeFilterValue(searchValue);

    const matchesSearch =
      !normalizedSearch ||
      [
        internship.title,
        internship.company,
        internship.location,
        internship.duration,
        internship.type,
        internship.category,
      ].some((value) => normalizeFilterValue(value).includes(normalizedSearch));

    const matchesCategory =
      selectedCategory === "all" ||
      normalizeFilterValue(internship.category) ===
        normalizeFilterValue(selectedCategory);

    const matchesLocation =
      selectedLocation === "all" ||
      normalizeFilterValue(internship.location).includes(
        normalizeFilterValue(selectedLocation),
      );

    const matchesDuration =
      selectedDuration === "all" ||
      normalizeFilterValue(internship.duration) ===
        normalizeFilterValue(selectedDuration);

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesDuration
    );
  });

  return (
    <>
      <motion.div
        className="container"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        {/* =========================
            Header
        ========================= */}

        <div
          className="
            d-flex
            justify-content-between
            align-items-center
            mb-4
          "
        >
          <div>
            <h3>All Internships</h3>

            <p className="text-secondary mb-0">Explore all internships.</p>
          </div>

          {/* Search */}

          <div className="col-md-4">
            <div className="input-group shadow-sm">
              <label htmlFor="search3" className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>

              <input
                type="text"
                className="form-control"
                id="search3"
                placeholder="Search internships..."
                value={searchValue}
                onChange={(event) =>
                  updateFilter({
                    search: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* =========================
            Internships
        ========================= */}

        {filteredInternships.length > 0 ? (
          <div className="row g-3">
            {filteredInternships.map((internship) => (
              <div
                className="
                    col-12
                    col-md-6
                    col-lg-4
                    mb-3
                  "
                key={internship._id}
              >
                <div
                  className="
                      card2
                      bg-white
                      shadow-sm
                      Card
                    "
                >
                  {/* Delete Button */}

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(internship._id)}
                    title="Delete Internship"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <div className="card-body2">
                    {/* Company Logo */}

                    <div className="company-header2">
                      <img
                        src={getCompanyLogo(internship)}
                        alt={internship.company}
                        width={50}
                      />
                    </div>

                    {/* Title */}

                    <h5>{internship.title}</h5>

                    {/* Company */}

                    <p>{internship.company}</p>

                    {/* Location */}

                    <p>
                      <i className="fa-solid fa-location-dot"></i>
                      &nbsp;
                      {internship.location}
                    </p>

                    {/* Duration */}

                    <p>
                      <i className="fa-regular fa-clock"></i>
                      &nbsp;
                      {internship.duration}
                    </p>

                    {/* Type */}

                    <span
                      className={`
                          internship-type
                          ${internship.type === "Part-time" ? "part-time" : ""}
                        `}
                    >
                      {internship.type}
                    </span>

                    {/* View Details */}

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setSelectedInternship(internship)}
                      data-bs-toggle="modal"
                      data-bs-target="#detailsModal"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="
              text-center
              text-secondary
              mt-4
            "
          >
            No internships found.
          </p>
        )}
      </motion.div>

      {/* =========================
          Details Modal
          Modal واحد فقط
      ========================= */}

      {selectedInternship && (
        <div
          className="modal fade"
          id="detailsModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div
            className="
              modal-dialog
              modal-dialog-centered
            "
          >
            <div className="modal-content">
              {/* Modal Header */}

              <div className="modal-header">
                <h5 className="modal-title">{selectedInternship.title}</h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={(event) => {
                    event.currentTarget.blur();

                    setSelectedInternship(null);
                  }}
                ></button>
              </div>

              {/* Modal Body */}

              <div className="modal-body">
                {/* Logo */}

                <div className="text-center mb-3">
                  <img
                    src={getCompanyLogo(selectedInternship)}
                    alt={selectedInternship.company}
                    width={60}
                  />
                </div>

                {/* Company */}

                <h6>{selectedInternship.company}</h6>

                {/* Location */}

                <p>
                  <i className="fa-solid fa-location-dot"></i>
                  &nbsp;
                  {selectedInternship.location}
                </p>

                {/* Type */}

                <p>
                  <i className="fa-solid fa-briefcase"></i>
                  &nbsp;
                  {selectedInternship.type}
                </p>

                {/* Duration */}

                <p>
                  <i className="fa-regular fa-clock"></i>
                  &nbsp;
                  {selectedInternship.duration}
                </p>

                <hr />

                {/* Description */}

                <h6>About the Internship</h6>

                <p>
                  {selectedInternship.description ||
                    "No description available."}
                </p>

                {/* Requirements */}

                <h6>Requirements</h6>

                <p>
                  {Array.isArray(selectedInternship.requirements)
                    ? selectedInternship.requirements.join(", ")
                    : selectedInternship.requirements ||
                      "No requirements available."}
                </p>

                {/* Skills */}

                <h6>Skills</h6>

                <div className="mb-3">
                  {selectedInternship.skills &&
                    Array.isArray(selectedInternship.skills) &&
                    selectedInternship.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="
                            badge
                            text-bg-primary
                            me-1
                          "
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                {/* Deadline */}

                {selectedInternship.deadline && (
                  <>
                    <h6>Application Deadline</h6>

                    <p>{selectedInternship.deadline}</p>
                  </>
                )}

                {/* How To Apply */}

                {selectedInternship.howToApply && (
                  <>
                    <h6>How to Apply</h6>

                    <p>{selectedInternship.howToApply}</p>
                  </>
                )}
              </div>

              {/* Modal Footer */}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    document.activeElement?.blur();

                    try {
                      await api.post("/applications", {
                        internshipId: selectedInternship._id,
                      });

                      alert("Application submitted successfully");
                    } catch (error) {
                      alert(error.response?.data?.message || "Failed to apply");
                    }
                  }}
                  data-bs-dismiss="modal"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
