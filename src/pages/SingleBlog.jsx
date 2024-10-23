import { BASE_URL } from "../constants";
import useAxiosGet from "../hooks/useAxiosGet";
import { Link, redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";

export async function SingleBlogloader() {
  const user = localStorage.getItem("user");

  if (!user) {
    return redirect("/login");
  }
  return null;
}

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateblog, setupdateblog } = useAuth();
  const {
    error,
    isLoading,
    data: singleBlog,
  } = useAxiosGet({ endpoint: BASE_URL + `/${id}`, sendToken: true });

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h1 className="text-danger">{error}</h1>
      </div>
    );
  }

  setupdateblog(singleBlog);

  const handledelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.access_token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (singleBlog && singleBlog.user_id) {
        const response = await axios.delete(
          `http://localhost:8081/api/v1/blogs/${singleBlog._id}`,
          config
        );
        if (response.status === 200) {
          toast.info("Blog Deleted Successfully.");
          return navigate("/");
        }
      } else {
        console.error("Invalid singleBlog object");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-lg" style={{ fontSize: "1.25rem" }}>
            <div className="card-body">
              <h3 className="mt-4">{singleBlog._id}</h3>{" "}
              {/* Added margin-top */}
              <h3 className="card-subtitle mb-2 text-muted mt-3">
                {singleBlog.heading}
              </h3>{" "}
              {/* Added margin-top */}
              <p className="card-text mt-4">
                <strong>Category:</strong> {singleBlog.category}
              </p>
              {/* Scrollable content area with hover effect and box shadow */}
              <div
                className="mt-4 p-3"
                style={{
                  height: "300px", // Reduced height to 300px
                  overflowY: "auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <p
                  className="card-text"
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {singleBlog.body}
                </p>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-lg btn-danger"
                  onClick={handledelete}
                >
                  Delete
                </button>
                <Link to={`/update/${id}`} className="btn btn-lg btn-primary">
                  Update Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
