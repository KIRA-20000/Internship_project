import { useEffect, useState } from "react";
import "./allCat.css";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function AllCategories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [backendCategories, setBackendCategories] = useState([]);

  const searchValue = searchParams.get("search") || "";

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        setBackendCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const updateFilter = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  const filteredCategories = backendCategories.filter((category) =>
    category.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

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
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container search">
        <div>
          <h3>All Categories</h3>

          <p>Explore internship opportunities across all categories.</p>
        </div>

        <div className="col-md-4">
          <div className="input-group shadow-sm">
            <label htmlFor="search3" className="input-group-text">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>

            <input
              type="text"
              className="form-control"
              id="search3"
              placeholder="Search categories..."
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

      {filteredCategories.length > 0 ? (
        <div className="row category-grid">
          {filteredCategories.map((category, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4"
              key={category._id || category.name}
            >
              <Link
                to={`/internships?category=${category.name}`}
                className="text-decoration-none text-dark d-block h-100"
              >
                <div className="card category-card shadow-sm h-100">
                  <div className="card-body category-card-body">
                    <div
                      className={`card-icon ${getCategoryTone(
                        category.name,
                        index,
                      )}`}
                    >
                      <i className={getCategoryIcon(category.name)}></i>
                    </div>

                    <h5 className="card-text">{category.name}</h5>

                    <p>Openings</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary mt-4">No categories found.</p>
      )}
    </motion.div>
  );
}
