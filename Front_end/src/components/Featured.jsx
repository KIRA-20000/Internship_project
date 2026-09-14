import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./Featured.css";

import googleLogo from "../assets/google-removebg-preview.png";
import amazonLogo from "../assets/amazone.png";
import microsoftLogo from "../assets/amazone-removebg-preview.png";
import defaultLogo from "../assets/briefcase-solid.png";
import api from "../api/axios";

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

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Featured() {
  const [internships, setInternships] = useState([]);
  const [searchParams] = useSearchParams();
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    const getFeaturedInternships = async () => {
      try {
        const response = await api.get("/internships/featured");
        setInternships(response.data.internships);
      } catch (error) {
        console.error("Error fetching featured internships:", error);
      }
    };

    getFeaturedInternships();
  }, []);

  // Delete Internship
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
      console.error("Error deleting internship:", error);
      alert("Failed to delete internship");
    }
  };

  const normalizeFilterValue = (value = "") =>
    String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const location = searchParams.get("location") || "all";
  const duration = searchParams.get("duration") || "all";

  const filteredInternships = internships.filter((internship) => {
    const normalizedSearch = search.toLowerCase().trim();

    const matchesSearch =
      internship.title.toLowerCase().includes(normalizedSearch) ||
      internship.company.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      category === "all" ||
      internship.category.toLowerCase() === category.toLowerCase();

    const matchesLocation =
      location === "all" ||
      normalizeFilterValue(internship.location).includes(
        normalizeFilterValue(location),
      );

    const matchesDuration =
      duration === "all" ||
      normalizeFilterValue(internship.duration) ===
        normalizeFilterValue(duration);

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesDuration
    );
  });

  return (
    <>
      <div className="container" id="internships">
        {/* Title */}
        <motion.div
          className="cont2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3>Featured Internships</h3>

          <p className="view">
            <Link to="/internships">View all internships</Link>
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredInternships.length === 0 ? (
            <div className="col-12 text-center py-4">
              <p className="text-muted mb-0">Internship not found</p>
            </div>
          ) : (
            filteredInternships.map((internship) => (
              <motion.div
                className="col mb-3"
                key={internship._id}
                variants={cardVariants}
              >
                <div className="card2 bg-white shadow-sm Card">
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
                    <div className="company-header2">
                      <img
                        src={getCompanyLogo(internship)}
                        alt={internship.company}
                        width={50}
                      />
                    </div>

                    <h5>{internship.title}</h5>

                    <p>{internship.company}</p>

                    <p>
                      <i className="fa-solid fa-location-dot"></i>
                      &nbsp; {internship.location}
                    </p>

                    <p>
                      <i className="fa-regular fa-clock"></i>
                      &nbsp; {internship.duration}
                    </p>

                    <span
                      className={`internship-type ${
                        internship.type === "Part-time" ? "part-time" : ""
                      }`}
                    >
                      {internship.type}
                    </span>

                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#internshipDetailsModal"
                      onClick={() => setSelectedInternship(internship)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="internshipDetailsModal"
        tabIndex="-1"
        aria-labelledby="internshipDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="internshipDetailsModalLabel">
                Internship Details
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(event) => event.currentTarget.blur()}
              ></button>
            </div>

            {selectedInternship && (
              <div className="modal-body">
                <div className="text-center mb-3">
                  <img
                    src={getCompanyLogo(selectedInternship)}
                    alt={selectedInternship.company}
                    width={60}
                  />
                </div>

                <h4 className="text-center">{selectedInternship.title}</h4>

                <p className="text-center">{selectedInternship.company}</p>

                <hr />

                <p>
                  <strong>Location:</strong> {selectedInternship.location}
                </p>

                <p>
                  <strong>Duration:</strong> {selectedInternship.duration}
                </p>

                <p>
                  <strong>Type:</strong> {selectedInternship.type}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {selectedInternship.description ||
                    "No description available."}
                </p>

                <p>
                  <strong>Requirements:</strong>{" "}
                  {selectedInternship.requirements ||
                    "No requirements available."}
                </p>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(event) => event.currentTarget.blur()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
