import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Profile from "./components/Profile";
import Nav from "./components/nav";
import Hero from "./components/hero";
import FooterSection from "./components/footersection";
import LogIn from "./components/logIn";
import SignIn from "./components/signIn";
import AllCategories from "./components/allCategories";
import AllIntern from "./components/allIntern";
import AllApps from "./components/allApps";
import Post from "./components/post";
import Footer from "./components/footer";
import Error from "./components/error";

function App() {
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || "",
  );

  useEffect(() => {
    const syncUserRole = () => {
      setUserRole(localStorage.getItem("userRole") || "");
    };

    const releaseModalFocus = (event) => {
      const modal = event.target;

      if (!(modal instanceof HTMLElement) || !modal.classList.contains("modal")) {
        return;
      }

      if (modal.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    };

    syncUserRole();
    window.addEventListener("storage", syncUserRole);
    window.addEventListener("userRoleChanged", syncUserRole);
    document.addEventListener("hide.bs.modal", releaseModalFocus);
    document.addEventListener("hidden.bs.modal", releaseModalFocus);

    return () => {
      window.removeEventListener("storage", syncUserRole);
      window.removeEventListener("userRoleChanged", syncUserRole);
      document.removeEventListener("hide.bs.modal", releaseModalFocus);
      document.removeEventListener("hidden.bs.modal", releaseModalFocus);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <main>
                <section id="home">
                  <Hero />
                </section>
                <section id="categories">
                  <Categories />
                </section>
                <section id="internships">
                  <Featured />
                </section>
                {(userRole === "student" || userRole === "company") && (
                  <section id="profile">
                    <Profile />
                  </section>
                )}
              </main>
              <FooterSection />
              <Footer />
            </>
          }
        />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/internships" element={<AllIntern />} />
        <Route path="/applications" element={<AllApps />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignIn />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
