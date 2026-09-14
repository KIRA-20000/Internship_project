import { useState } from "react";
import {
  FaEnvelope,
  FaUserPlus,
  FaSearch,
  FaPaperPlane,
  FaUserGraduate,
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api/axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setSubscribed(false);
      return;
    }

    try {
      await api.post("/newsletter/subscribe", { email });
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      setSubscribed(false);
      console.error("Newsletter subscription failed:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fcfaff",
        fontFamily: "sans-serif",
        direction: "ltr",
        textAlign: "left",
      }}
    >
      {/* ================= HOW IT WORKS ================= */}

      <motion.section
        className="py-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2
            className="fw-bold mb-5"
            style={{ color: "#1e1b4b" }}
            variants={itemVariants}
          >
            How it works
          </motion.h2>

          <motion.div
            className="row align-items-center justify-content-center g-4"
            variants={containerVariants}
          >
            {/* Step 1 */}
            <motion.div className="col-lg-3 col-md-4" variants={cardVariants}>
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#f3e8ff",
                    color: "#7c3aed",
                  }}
                >
                  <FaUserPlus size={26} />
                </div>

                <h5
                  className="fw-bold mb-2"
                  style={{
                    color: "#1e1b4b",
                    fontSize: "1rem",
                  }}
                >
                  1. Create Account
                </h5>

                <p className="text-muted small mb-0">
                  Sign up and create your profile in minutes.
                </p>
              </div>
            </motion.div>

            <div className="col-lg-1 d-none d-lg-flex justify-content-center">
              <span className="text-muted opacity-50 fs-4">······&gt;</span>
            </div>

            {/* Step 2 */}
            <motion.div className="col-lg-3 col-md-4" variants={cardVariants}>
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#f3e8ff",
                    color: "#7c3aed",
                  }}
                >
                  <FaSearch size={26} />
                </div>

                <h5
                  className="fw-bold mb-2"
                  style={{
                    color: "#1e1b4b",
                    fontSize: "1rem",
                  }}
                >
                  2. Find Opportunities
                </h5>

                <p className="text-muted small mb-0">
                  Search and filter internships that match your goals.
                </p>
              </div>
            </motion.div>

            <div className="col-lg-1 d-none d-lg-flex justify-content-center">
              <span className="text-muted opacity-50 fs-4">······&gt;</span>
            </div>

            {/* Step 3 */}
            <motion.div className="col-lg-3 col-md-4" variants={cardVariants}>
              <div className="p-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#f3e8ff",
                    color: "#7c3aed",
                  }}
                >
                  <FaPaperPlane size={24} />
                </div>

                <h5
                  className="fw-bold mb-2"
                  style={{
                    color: "#1e1b4b",
                    fontSize: "1rem",
                  }}
                >
                  3. Apply & Grow
                </h5>

                <p className="text-muted small mb-0">
                  Apply with one click and start your journey.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= STATISTICS ================= */}

      <motion.section
        className="py-4 my-3"
        style={{ backgroundColor: "#f5f3ff" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div
            className="row text-center g-3 align-items-center"
            variants={containerVariants}
          >
            {/* Students */}
            <motion.div className="col-md-3 col-6" variants={itemVariants}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaUserGraduate size={24} style={{ color: "#7c3aed" }} />

                <div className="text-start">
                  <h4
                    className="fw-bold mb-0"
                    style={{
                      color: "#1e1b4b",
                      fontSize: "1.25rem",
                    }}
                  >
                    10,000+
                  </h4>

                  <span className="text-muted small">Active Students</span>
                </div>
              </div>
            </motion.div>

            {/* Opportunities */}
            <motion.div className="col-md-3 col-6" variants={itemVariants}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaBuilding size={24} style={{ color: "#7c3aed" }} />

                <div className="text-start">
                  <h4
                    className="fw-bold mb-0"
                    style={{
                      color: "#1e1b4b",
                      fontSize: "1.25rem",
                    }}
                  >
                    2,500+
                  </h4>

                  <span className="text-muted small">
                    Internship Opportunities
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Companies */}
            <motion.div className="col-md-3 col-6" variants={itemVariants}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaHandshake size={24} style={{ color: "#7c3aed" }} />

                <div className="text-start">
                  <h4
                    className="fw-bold mb-0"
                    style={{
                      color: "#1e1b4b",
                      fontSize: "1.25rem",
                    }}
                  >
                    1,200+
                  </h4>

                  <span className="text-muted small">Partner Companies</span>
                </div>
              </div>
            </motion.div>

            {/* Success */}
            <motion.div className="col-md-3 col-6" variants={itemVariants}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaChartLine size={24} style={{ color: "#7c3aed" }} />

                <div className="text-start">
                  <h4
                    className="fw-bold mb-0"
                    style={{
                      color: "#1e1b4b",
                      fontSize: "1.25rem",
                    }}
                  >
                    78%
                  </h4>

                  <span className="text-muted small">Success Rate</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= STUDENTS SAY ================= */}

      <motion.section
        className="py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h3
            className="fw-bold text-center mb-5"
            style={{ color: "#1e1b4b" }}
            variants={itemVariants}
          >
            What students say
          </motion.h3>

          <motion.div className="row g-4" variants={containerVariants}>
            {/* Review 1 */}
            <motion.div className="col-md-4" variants={cardVariants}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between border-0 Card">
                <div>
                  <FaQuoteLeft
                    className="text-muted mb-3 opacity-25"
                    size={22}
                  />

                  <p className="text-muted small" style={{ lineHeight: "1.6" }}>
                    InternHub helped me find the perfect internship that matched
                    my skills and interests. The process was so easy!
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                      alt="Sarah Johnson"
                      className="rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        objectFit: "cover",
                      }}
                    />

                    <div>
                      <h6
                        className="mb-0 fw-bold"
                        style={{
                          color: "#1e1b4b",
                          fontSize: "0.85rem",
                        }}
                      >
                        Sarah Johnson
                      </h6>

                      <span className="text-muted" style={{ fontSize: "10px" }}>
                        Marketing Intern at Spotify
                      </span>
                    </div>
                  </div>

                  <span
                    className="fw-bold text-success"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Spotify
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div className="col-md-4" variants={cardVariants}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between border-0 Card">
                <div>
                  <FaQuoteLeft
                    className="text-muted mb-3 opacity-25"
                    size={22}
                  />

                  <p className="text-muted small" style={{ lineHeight: "1.6" }}>
                    I got my dream internship at Microsoft through InternHub.
                    Highly recommend it to everyone!
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                      alt="Mike Chen"
                      className="rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        objectFit: "cover",
                      }}
                    />

                    <div>
                      <h6
                        className="mb-0 fw-bold"
                        style={{
                          color: "#1e1b4b",
                          fontSize: "0.85rem",
                        }}
                      >
                        Mike Chen
                      </h6>

                      <span className="text-muted" style={{ fontSize: "10px" }}>
                        Software Engineering Intern at Microsoft
                      </span>
                    </div>
                  </div>

                  <div
                    className="d-grid"
                    style={{
                      gridTemplateColumns: "repeat(2, 6px)",
                      gap: "2px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#f25022",
                        width: "6px",
                        height: "6px",
                      }}
                    ></div>

                    <div
                      style={{
                        backgroundColor: "#7fba00",
                        width: "6px",
                        height: "6px",
                      }}
                    ></div>

                    <div
                      style={{
                        backgroundColor: "#00a4ef",
                        width: "6px",
                        height: "6px",
                      }}
                    ></div>

                    <div
                      style={{
                        backgroundColor: "#ffb900",
                        width: "6px",
                        height: "6px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div className="col-md-4" variants={cardVariants}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between border-0 Card">
                <div>
                  <FaQuoteLeft
                    className="text-muted mb-3 opacity-25"
                    size={22}
                  />

                  <p className="text-muted small" style={{ lineHeight: "1.6" }}>
                    Great platform with amazing opportunities. I received
                    multiple offers from top companies.
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                      alt="Emily Davis"
                      className="rounded-circle"
                      style={{
                        width: "38px",
                        height: "38px",
                        objectFit: "cover",
                      }}
                    />

                    <div>
                      <h6
                        className="mb-0 fw-bold"
                        style={{
                          color: "#1e1b4b",
                          fontSize: "0.85rem",
                        }}
                      >
                        Emily Davis
                      </h6>

                      <span className="text-muted" style={{ fontSize: "10px" }}>
                        Product Intern at Amazon
                      </span>
                    </div>
                  </div>

                  <span
                    className="fw-bold text-dark"
                    style={{
                      fontSize: "0.85rem",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    amazon
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= NEWSLETTER ================= */}

      <motion.section
        style={{
          backgroundColor: "#7c3aed",
          padding: "30px 0",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <motion.div
              className="col-lg-6 d-flex align-items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="bg-white p-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  width: "45px",
                  height: "45px",
                  color: "#6366f1",
                }}
              >
                <FaEnvelope size={20} />
              </div>

              <div className="text-white">
                <h5 className="mb-1 fw-bold" style={{ fontSize: "1.1rem" }}>
                  Never miss an opportunity
                </h5>

                <p className="mb-0 small text-white-50">
                  Get the latest internships delivered to your inbox.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <form className="input-group" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control border-0 py-2 px-3 shadow-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubscribed(false);
                  }}
                  required
                />

                <button
                  className="btn text-white px-4 fw-semibold shadow-none"
                  type="submit"
                  style={{ backgroundColor: "#4338ca" }}
                >
                  Subscribe
                </button>
              </form>

              {subscribed && (
                <p className="text-white small mt-2 mb-0">
                  You are subscribed successfully.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default FooterSection;
