import { Link, useNavigate, redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blog.css"; // Import a custom CSS file for additional styling

export function checkiflogin() {
  const user = localStorage.getItem("user");
  if (user) {
    return null;
  } else {
    return redirect("/login");
  }
}

function Blog({ _id: id, heading, category, body }) {
  return (
    <div className="col-md-6 col-12 mb-3">
      <Link
        to={`/${id}`}
        // onClick={checkiflogin}
        className="card h-100 blog-card"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="card-body blog-body">
          <h3 className="card-title">
            <strong>Heading : </strong>
            {heading}
          </h3>
          <hr />
          <h4 className="card-subtitle text-muted">
            <strong>Category : </strong>
            {category}
          </h4>
          <br />
          <h4>Body : </h4>

          <div className="blog-content">
            <p className="card-text blog-text">{body}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Blog;
