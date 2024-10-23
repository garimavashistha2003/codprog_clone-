import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateBlog() {
  const { updateblog, setupdateblog } = useAuth();
  const [heading, setHeading] = useState(updateblog.heading);
  const [body, setBody] = useState(updateblog.body);
  const [category, setCategory] = useState(updateblog.category);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleupdate(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      const token = user.access_token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `http://localhost:8081/api/v1/blogs/${updateblog._id}`,
        { heading, body, category },
        config,
      );
      if(response.status===200){
        toast.info("Blog Updated Sucessfully ...");
        navigate(`/${updateblog._id}`);
      }
      console.log(response);
    } catch (error) {
      toast.info(error.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        className="p-4 border rounded bg-light shadow"
        onSubmit={handleupdate}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2 className="mb-4">Update Blog Here</h2>
        <h3>{updateblog._id}</h3>
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
            {isLoading ? "Updating ..." : "Update"}
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}

export default UpdateBlog;
