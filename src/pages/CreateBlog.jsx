import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function createblogloader() {
  const user = localStorage.getItem("user");
  if (!user) {
    return redirect("/login");
  }
  return null;
}

function CreateBlog() {
  const { auth } = useAuth();
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    try {
      await axios.post(
        `${BASE_URL}`, // Make sure your endpoint is correct
        { heading, body, category },
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      setBody("");
      setCategory("");
      setHeading("");
      navigate("/my-blogs");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-light shadow"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h1 className="mb-4">Create a New Blog Here</h1>
        <div className="mb-3">
          <label htmlFor="heading" className="form-label">
            Heading
          </label>
          <input
            type="text"
            className="form-control"
            name="heading"
            placeholder="Enter Heading ..."
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            placeholder="Enter Category ..."
            type="text"
            className="form-control"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="blog-body" className="form-label">
            Body
          </label>
          <textarea
            placeholder="Enter the Content of your Blog ..."
            className="form-control"
            name="blog-body"
            id="blog-body"
            cols="30"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: "90%" }}
          >
            {isLoading ? "Creating ..." : "Create"}
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}

export default CreateBlog;
