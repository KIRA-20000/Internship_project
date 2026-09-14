import "./nav.css";
import { FaBriefcase } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Nav() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || "",
  );

  useEffect(() => {
    const syncUserRole = () => {
      setUserRole(localStorage.getItem("userRole") || "");
    };

    syncUserRole();
    window.addEventListener("storage", syncUserRole);
    window.addEventListener("userRoleChanged", syncUserRole);

    if (!localStorage.getItem("token")) return;

    api
      .get("/users/profile")
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));

    return () => {
      window.removeEventListener("storage", syncUserRole);
      window.removeEventListener("userRoleChanged", syncUserRole);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.dispatchEvent(new Event("userRoleChanged"));
    setUser(null);
    setUserRole("");
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg py-0 fixed-top bg-white shadow-sm">
      <div className="container">
        <a
          className="navbar-brand fw-bold text-dark d-flex align-items-center"
          href="#home"
        >
          <FaBriefcase
            className="me-2"
            size={30}
            style={{ color: "#7c3aed" }}
          />
          Intern<span>Hub</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-4">
            <li className="nav-item">
              <a
                className="nav-link active fw-semibold link"
                href="#home"
                style={{ color: "#7c3aed" }}
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link text-dark fw-semibold link"
                href="#internships"
              >
                Internships
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link text-dark fw-semibold link"
                href="#categories"
              >
                For Students
              </a>
            </li>

            {userRole === "company" && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-semibold link"
                  to="/post"
                >
                  For Companies
                </Link>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link text-dark fw-semibold link" href="#about">
                About Us
              </a>
            </li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <>
                <span className="fw-semibold">Hi, {user.name}</span>

                <button
                  onClick={handleLogout}
                  className="btn px-4 py-2"
                  style={{
                    border: "1px solid #7c3aed",
                    color: "#7c3aed",
                    backgroundColor: "white",
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn px-4 py-2 link"
                  style={{
                    border: "1px solid #7c3aed",
                    color: "#7c3aed",
                  }}
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="btn px-4 nav-bton link"
                  style={{
                    backgroundColor: "#7c3aed",
                    color: "white",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
