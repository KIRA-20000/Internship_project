import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";
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

export default function Categories() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const getCategoryIcon = (name) => {
    switch (name) {
      case "Development":
        return "fa-solid fa-code";
      case "Design":
        return "fa-brands fa-pinterest-p";
      case "Marketing":
        return "fa-solid fa-bullhorn";
      case "Data Science":
        return "fa-solid fa-robot";
      case "Cyber Security":
        return "fa-solid fa-shield-halved";
      case "Mobile Development":
        return "fa-solid fa-mobile-screen-button";
      default:
        return "fa-solid fa-briefcase";
    }
  };

  const getCategoryTone = (name, index) => {
    const tones = ["tone-1", "tone-2", "tone-3", "tone-4", "tone-5", "tone-6"];
    const normalized = name?.toLowerCase() || "";

    if (normalized.includes("security")) return "tone-1";
    if (normalized.includes("data")) return "tone-2";
    if (normalized.includes("design")) return "tone-3";
    if (normalized.includes("development")) return "tone-4";
    if (normalized.includes("marketing")) return "tone-5";
    if (normalized.includes("mobile")) return "tone-6";

    return tones[index % tones.length];
  };

  return (
    <div className="container">
      <motion.div
        className="cont"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3>Browse Categories</h3>

        <p className="view">
          <Link to="/categories">View all categories</Link>
        </p>
      </motion.div>

      <motion.div
        className="row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category._id || category.name}
            className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4 Card"
            variants={cardVariants}
          >
            <Link
              to={`/internships?category=${category.name}`}
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="card h-100 shadow-sm category-card">
                <div className="card-body category-card-body">
                  <div
                    className={`card-icon ${getCategoryTone(category.name, index)}`}
                  >
                    <i className={getCategoryIcon(category.name)}></i>
                  </div>

                  <h5 className="card-text">{category.name}</h5>
                  <p>Openings</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
