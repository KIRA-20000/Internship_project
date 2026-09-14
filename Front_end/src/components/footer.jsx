import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer
        id="about"
        style={{
          backgroundColor: "#0b041a",
          color: "#ffffff",
          padding: "60px 0 8px 0",
        }}
      >
        <div className="container">
          <div className="row g-4 justify-content-between">
            {/* Logo */}
            <div className="col-lg-3 col-md-6">
              <h4
                className="fw-bold mb-2 text-white"
                style={{ fontSize: "1.2rem" }}
              >
                <span style={{ color: "#a855f7" }}>■</span> InternHub
              </h4>

              <p
                className="text-white-50 small mb-3"
                style={{ lineHeight: "1.6" }}
              >
                Connecting talented students with the best internship
                opportunities.
              </p>

              <div className="d-flex gap-3 text-white-50">
                <a
                  href="#twitter"
                  className="text-white-50 text-decoration-none"
                >
                  <FaTwitter size={15} />
                </a>

                <a
                  href="#linkedin"
                  className="text-white-50 text-decoration-none"
                >
                  <FaLinkedinIn size={15} />
                </a>

                <a
                  href="#instagram"
                  className="text-white-50 text-decoration-none"
                >
                  <FaInstagram size={15} />
                </a>
              </div>
            </div>

            {/* Students */}
            <div className="col-lg-2 col-md-6">
              <h6
                className="fw-bold mb-3 text-white"
                style={{ fontSize: "0.9rem" }}
              >
                For Students
              </h6>

              <ul
                className="list-unstyled text-white-50 small"
                style={{ lineHeight: "2.2" }}
              >
                <li>
                  <Link
                    to="/internships"
                    className="text-decoration-none text-white-50"
                  >
                    Browse Internships
                  </Link>
                </li>

                <li>
                  <Link
                    to="/applications"
                    className="text-decoration-none text-white-50"
                  >
                    My Applications
                  </Link>
                </li>

                <li>
                  <Link
                    to="/signup"
                    className="text-decoration-none text-white-50"
                  >
                    Create Profile
                  </Link>
                </li>

                <li>
                  <Link to="/" className="text-decoration-none text-white-50">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Companies */}
            <div className="col-lg-2 col-md-6">
              <h6
                className="fw-bold mb-3 text-white"
                style={{ fontSize: "0.9rem" }}
              >
                For Companies
              </h6>

              <ul
                className="list-unstyled text-white-50 small"
                style={{ lineHeight: "2.2" }}
              >
                <li>
                  <Link
                    to="/post"
                    className="text-decoration-none text-white-50"
                  >
                    Post an Internship
                  </Link>
                </li>

                <li>
                  <a
                    href="#candidates"
                    className="text-decoration-none text-white-50"
                  >
                    Browse Candidates
                  </a>
                </li>

                <li>
                  <a
                    href="#pricing"
                    className="text-decoration-none text-white-50"
                  >
                    Pricing
                  </a>
                </li>

                <li>
                  <a
                    href="#comp-resources"
                    className="text-decoration-none text-white-50"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="col-lg-2 col-md-6">
              <h6
                className="fw-bold mb-3 text-white"
                style={{ fontSize: "0.9rem" }}
              >
                About Us
              </h6>

              <ul
                className="list-unstyled text-white-50 small"
                style={{ lineHeight: "2.2" }}
              >
                <li>
                  <a
                    href="#about"
                    className="text-decoration-none text-white-50"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="text-decoration-none text-white-50"
                  >
                    Contact Us
                  </a>
                </li>

                <li>
                  <a
                    href="#faqs"
                    className="text-decoration-none text-white-50"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-lg-2 col-md-6">
              <h6
                className="fw-bold mb-3 text-white"
                style={{ fontSize: "0.9rem" }}
              >
                Support
              </h6>

              <ul
                className="list-unstyled text-white-50 small"
                style={{ lineHeight: "2.2" }}
              >
                <li>
                  <a
                    href="#help"
                    className="text-decoration-none text-white-50"
                  >
                    Help Center
                  </a>
                </li>

                <li>
                  <a
                    href="#privacy"
                    className="text-decoration-none text-white-50"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#terms"
                    className="text-decoration-none text-white-50"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-2" style={{ borderColor: "#1f143a" }} />

          <div className="text-center text-white-50 small">
            <p className="mb-0">© 2026 InternHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
