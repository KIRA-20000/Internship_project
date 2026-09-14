import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import defaultLogo from "../assets/briefcase-solid.png";
export default function AllApps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const accessDenied = Boolean(token) && userRole !== "student";

  useEffect(() => {
    if (!token || userRole !== "student") return;

    const getApplications = async () => {
      try {
        const response = await api.get("/applications/my");
        setApplications(response.data.applications || []);
      } catch (error) {
        if (error.response?.status !== 401 && error.response?.status !== 403) {
          console.error("Error fetching applications:", error);
        }

        if (error.response?.status === 403 || error.response?.status === 401) {
          setApplications([]);
        }
      }
    };

    getApplications();
  }, [token, userRole]);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredApplications = applications.filter((application) =>
    `${application.internship.company} ${application.internship.title}`
      .toLowerCase()
      .includes(normalizedSearchTerm),
  );

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <h3>All Applications</h3>
          <p className="text-secondary">Explore all Applications.</p>
        </div>

        <div className="input-group w-25">
          <label htmlFor="search4" className="input-group-text">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>

          <input
            type="text"
            className="form-control shadow-sm"
            id="search4"
            placeholder="Search Applications..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {accessDenied ? (
          <div className="col-12">
            <div className="alert alert-info mt-3 mb-0">
              This page is only available for student accounts.
            </div>
          </div>
        ) : filteredApplications.length > 0 ? (
          filteredApplications.map((application, index) => (
            <div
              className="col-sm-6 mb-3 mb-sm-3"
              key={`${application.internship.company}-${application.internship.title}-${index}`}
            >
              <div className="app bg-white p-3">
                <div className="left-side">
                  <div>
                    <img
                      src={application.internship.logo || defaultLogo}
                      alt={application.internship.company}
                      width={40}
                    />
                  </div>

                  <div>
                    <h5>{application.internship.company}</h5>
                    <p>{application.internship.title}</p>
                  </div>
                </div>

                <div>
                  <span className="text-capitalize">
                    {String(application.status || "pending")
                      .charAt(0)
                      .toUpperCase() +
                      String(application.status || "pending").slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary">No applications found.</p>
        )}
      </div>
    </motion.div>
  );
}
