import { useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import defaultLogo from "../assets/briefcase-solid.png";

// Animation للحاوية
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation للأجزاء
const itemVariants = {
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

function getInitialProfile() {
  try {
    const savedProfile = JSON.parse(
      localStorage.getItem("internhubProfile") || "{}",
    );

    return {
      name: savedProfile.name || "",
      email: savedProfile.email || "",
      phone: savedProfile.phone || "",
      university: savedProfile.university || "",
      degree: savedProfile.degree || "",
      startYear: savedProfile.startYear || "",
      endYear: savedProfile.endYear || "",
      skills: Array.isArray(savedProfile.skills) ? savedProfile.skills : [],
      aboutMe: savedProfile.aboutMe || "",
      cvName: savedProfile.cvName || "",
    };
  } catch {
    return {
      name: "",
      email: "",
      phone: "",
      university: "",
      degree: "",
      startYear: "",
      endYear: "",
      skills: [],
      aboutMe: "",
      cvName: "",
    };
  }
}

export default function Profile() {
  const initialProfile = getInitialProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [applications, setApplications] = useState([]);
  const [companyInternships, setCompanyInternships] = useState([]);
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || "student",
  );

  useEffect(() => {
    const syncUserRole = () =>
      setUserRole(localStorage.getItem("userRole") || "student");
    window.addEventListener("userRoleChanged", syncUserRole);

    return () => window.removeEventListener("userRoleChanged", syncUserRole);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentRole = localStorage.getItem("userRole");

    if (!token || currentRole !== "student") return;

    const getApplications = async () => {
      try {
        const response = await api.get("/applications/my");
        setApplications(response.data.applications || []);
      } catch (error) {
        if (error.response?.status !== 401 && error.response?.status !== 403) {
          console.error("Error fetching applications:", error);
        }
      }
    };

    getApplications();
  }, [userRole]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentRole = localStorage.getItem("userRole");

    if (!token || currentRole !== "company") return;

    const getCompanyInternships = async () => {
      try {
        const response = await api.get("/internships/my");
        setCompanyInternships(response.data.internships || []);
      } catch (error) {
        if (error.response?.status !== 401 && error.response?.status !== 403) {
          console.error("Error fetching company internships:", error);
        }
      }
    };

    getCompanyInternships();
  }, [userRole]);
  // Profile Information
  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone);

  // Education
  const [university, setUniversity] = useState(initialProfile.university);
  const [degree, setDegree] = useState(initialProfile.degree);
  const [startYear, setStartYear] = useState(initialProfile.startYear);
  const [endYear, setEndYear] = useState(initialProfile.endYear);

  // Skills
  const [skills, setSkills] = useState(initialProfile.skills);

  // About Me
  const [aboutMe, setAboutMe] = useState(initialProfile.aboutMe);

  // CV
  const [cv, setCv] = useState(
    initialProfile.cvName ? { name: initialProfile.cvName } : null,
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    const getProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        const user = response?.data?.user || {};

        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setUniversity(user.education || "");
        setDegree(user.degree || "");
        setStartYear(user.startYear || "");
        setEndYear(user.endYear || "");
        setSkills(Array.isArray(user.skills) ? user.skills : []);
        setAboutMe(user.aboutMe || "");
        setCv(user.cv ? { name: user.cv } : null);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    getProfile();
  }, []);

  async function handleSaveProfile() {
    try {
      await api.put("/users/profile", {
        name,
        email,
        phone,
        education: university,
        degree,
        startYear,
        endYear,
        skills,
        aboutMe,
      });

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  }

  // Upload CV
  async function handleCVUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("cv", file);

      await api.post("/users/profile/cv", formData);

      setCv(file);

      alert("CV uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload CV");
    }
  }
  async function handleDownloadCV() {
    try {
      const response = await api.get("/users/profile/cv", {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"] || "application/pdf";
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", cv?.name || "CV.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to download CV");
    }
  }
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="row content">
        <motion.div className="col-md-3 p-4 mb-3" variants={itemVariants}>
          <h3 className="text-start pb-2">Your Profile</h3>

          <div className="pro">
            <div>
              <i className="fa-regular fa-circle-user" id="pro-icon"></i>
            </div>

            {isEditing ? (
              <input
                type="text"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <h3>{name}</h3>
            )}

            <p>
              {userRole === "company"
                ? "Company account"
                : "Computer science student"}
            </p>

            <div>
              <i className="fa-regular fa-envelope"></i>

              {isEditing ? (
                <input
                  type="email"
                  className="form-control my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span> {email}</span>
              )}
            </div>

            <div>
              <i className="fa-solid fa-phone"></i>

              {isEditing ? (
                <input
                  type="text"
                  className="form-control my-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <span> {phone}</span>
              )}
            </div>
          </div>
        </motion.div>

        {userRole === "company" ? (
          <>
            <motion.div className="col-md-8 p-4 mb-3" variants={itemVariants}>
              <div className="company-merged-card">
                <div className="company-card-section">
                  <h4>About Us</h4>
                  <div className="skill">
                    <p>{aboutMe || "No company description yet."}</p>
                  </div>
                </div>

                <div className="company-card-section company-panel-divider">
                  <div className="app-heading mb-3">
                    <h4>Posted Jobs</h4>
                  </div>

                  <div className="all-apps">
                    {companyInternships.length > 0 ? (
                      companyInternships.map((internship, index) => (
                        <motion.div
                          key={internship._id || index}
                          className="app bg-white p-3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.15 }}
                        >
                          <div className="left-side">
                            <div>
                              <img
                                src={internship.logo || defaultLogo}
                                alt={internship.company || "Internship"}
                                width={40}
                              />
                            </div>

                            <div>
                              <h5>{internship.title}</h5>
                              <p>
                                {internship.location} • {internship.type} •{" "}
                                {internship.duration}
                              </p>
                            </div>
                          </div>

                          <div>
                            <span>
                              {internship.remote ? "Remote" : "On-site"}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="app bg-white p-3">
                        <p className="mb-0">No jobs added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="Skill col-md-4 p-4 mb-3"
              variants={itemVariants}
            >
              <div>
                <h4>Education</h4>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />

                    <input
                      type="text"
                      className="form-control mb-2"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    />

                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                      />

                      <input
                        type="text"
                        className="form-control"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h4>{university}</h4>

                    <p>{degree}</p>

                    <p>
                      {startYear} - {endYear}
                    </p>
                  </>
                )}
              </div>

              <hr />

              <div>
                <h4>Skills</h4>

                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={skills.join(", ")}
                    onChange={(e) =>
                      setSkills(
                        e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter(Boolean),
                      )
                    }
                    placeholder="HTML, CSS, JavaScript, React"
                  />
                ) : (
                  <div className="skill">
                    {skills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              <hr />

              <div>
                <h4>About Me</h4>

                {isEditing ? (
                  <textarea
                    className="form-control"
                    rows="5"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                ) : (
                  <div className="skill">
                    <p>{aboutMe}</p>
                  </div>
                )}
              </div>

              <hr />

              <div>
                <h4>CV/Resume</h4>

                <div className="skill">
                  <div className="cv-box">
                    <div className="cv-info">
                      <i className="fa-regular fa-file-lines cv-icon"></i>

                      <span className="cv-name">
                        {cv ? cv.name : "Fatema_Mohey_CV.pdf"}
                      </span>
                    </div>

                    {isEditing && (
                      <label className="btn-download">
                        Upload CV
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleCVUpload}
                          hidden
                        />
                      </label>
                    )}

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={handleDownloadCV}
                        className="btn-download"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="App col-md-4 p-4" variants={itemVariants}>
              <div className="text-end">
                <button
                  type="button"
                  className="btn link"
                  style={{
                    border: "1px solid #7c3aed",
                    color: "#7c3aed",
                  }}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit profile"}
                </button>
              </div>

              <hr />

              {isEditing && (
                <div className="mb-4">
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "#7c3aed",
                      color: "white",
                    }}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              )}

              <div className="app-heading">
                <h4>My Applications</h4>

                <Link
                  to="/applications"
                  className="view "
                  style={{ color: "#7c3aed" }}
                >
                  view all
                </Link>
              </div>

              <div className="all-apps">
                {Array.isArray(applications) && applications.length > 0 ? (
                  applications.map((application, index) => {
                    const internship = application?.internship || {};

                    return (
                      <motion.div
                        key={
                          application?._id ||
                          `${internship?.company || "internship"}-${index}`
                        }
                        className="app bg-white p-3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + index * 0.15,
                        }}
                      >
                        <div className="left-side">
                          <div>
                            <img
                              src={internship.logo || defaultLogo}
                              alt={internship.company || "Internship"}
                              width={40}
                            />
                          </div>

                          <div>
                            <h5>{internship.company || "Company"}</h5>
                            <p>{internship.title || "Internship position"}</p>
                          </div>
                        </div>

                        <div>
                          <span>{application?.status || "Pending"}</span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="app bg-white p-3">
                    <p className="mb-0">No applications yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
