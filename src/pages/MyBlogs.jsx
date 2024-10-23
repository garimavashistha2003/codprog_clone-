import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import Blog from "../Components/Blog";
import { useAuth } from "../contexts/AuthContextProvider";
import styles from "./MyBlog.module.css";
import useAxiosGet from "../hooks/useAxiosGet";
import { useNavigate } from "react-router-dom";
export  function myblogsloader(){
  const user=localStorage.getItem("user");
  if(!user){
    navigate("/login");

  }
}
function MyBlogs() {

  const {
    error,
    isLoading,
    data: myBlogs,
  } = useAxiosGet({ endpoint: BASE_URL + "/my-blogs", sendToken: true });
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={styles.container}>
      <h1>My Blogs</h1>

      {myBlogs.map((blog) => (
        <Blog key={blog._id} {...blog} />
      ))}
    </div>
  );
}
export default MyBlogs;

