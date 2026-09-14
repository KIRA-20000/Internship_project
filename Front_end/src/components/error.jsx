import { Link } from "react-router-dom";
import errorAnimation from "../assets/404.svg";

export default function Error() {
  return (
    <div className="container text-center mt-5">
      <img
        src={errorAnimation}
        alt="404"
        style={{
          width: "400px",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      />
      <h2>Oops! Page Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <Link
        to="/"
        className="btn rounded-pill px-4 py-2"
        style={{
          color: "#7c3aed",
          border: "1px solid #7c3aed",
        }}
      >
        Go To Home
      </Link>
    </div>
  );
}
