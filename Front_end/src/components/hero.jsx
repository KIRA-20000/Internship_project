import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/photo_2026-09-02_11-55-21.jpg";
import "./Hero.css";

// Animation للحاوية الرئيسية
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation لكل عنصر
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Hero() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentUserRole = localStorage.getItem("userRole");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const location = searchParams.get("location") || "all";
  const duration = searchParams.get("duration") || "all";

  const updateFilters = (filters) => {
    navigate(
      `/?search=${encodeURIComponent(filters.search)}&category=${filters.category}&location=${filters.location}&duration=${filters.duration}#internships`,
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();

    updateFilters({
      search,
      category,
      location,
      duration,
    });
  };

  const handleFilterChange = (name, value) => {
    if (name === "search" && value.trim() === "") {
      updateFilters({
        search: "",
        category: "all",
        location: "all",
        duration: "all",
      });

      return;
    }

    const filters = {
      search,
      category,
      location,
      duration,
      [name]: value,
    };

    updateFilters(filters);
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <motion.div
        className="container"
        id="home"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero px-4">
          {/* النص */}
          <motion.div className="hero-text" variants={itemVariants}>
            <h1>
              Find the right internship to{" "}
              <span style={{ color: "#7c3aed" }}>launch</span> your career
            </h1>

            <p>
              Discover internships that match your skills, interests and career
              goals. Apply and grow your future.
            </p>

            <motion.div
              className="hero-buttons d-flex gap-3"
              variants={itemVariants}
            >
              <a
                href="#internships"
                className="btn text-white rounded-pill px-4 link"
                style={{ backgroundColor: "#7c3aed" }}
              >
                Browse Internships
              </a>

              {currentUserRole === "company" && (
                <Link
                  to="/post"
                  className="btn rounded-pill px-4 py-2 link"
                  style={{
                    color: "#7c3aed",
                    border: "1px solid #7c3aed",
                  }}
                >
                  Post an Internship
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* الصورة */}
          <motion.div className="hero-image" variants={itemVariants}>
            <img src={heroImage} alt="Student with books" />
          </motion.div>
        </div>
      </motion.div>

      {/* ================= SEARCH ================= */}
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.form
          className="row g-3 align-items-end"
          onSubmit={handleSearch}
          variants={itemVariants}
        >
          {/* Search */}
          <div className="col-12 col-sm-6 col-md-3">
            <label htmlFor="search" className="form-label text-black">
              Search Internship
            </label>

            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search internship"
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="col-12 col-sm-6 col-md-2">
            <label htmlFor="category" className="form-label text-black">
              Category
            </label>

            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>

          {/* Location */}
          <div className="col-12 col-sm-6 col-md-2">
            <label htmlFor="location" className="form-label text-black">
              Location
            </label>

            <select
              className="form-select"
              id="location"
              value={location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Remote">benha</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">giza</option>
            </select>
          </div>

          {/* Duration */}
          <div className="col-12 col-sm-6 col-md-2">
            <label htmlFor="duration" className="form-label text-black">
              Duration
            </label>

            <select
              className="form-select"
              id="duration"
              value={duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
            >
              <option value="all">All Duration</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="9 Months">9 Months</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="col-12 col-sm-6 col-md-2">
            <button
              type="submit"
              className="btn text-white rounded w-100 link"
              style={{ backgroundColor: "#7c3aed" }}
            >
              Search
            </button>
          </div>
        </motion.form>
      </motion.div>
    </>
  );
}
