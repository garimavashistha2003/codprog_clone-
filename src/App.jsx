import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Layots from "./pages/Layots";
import Login, { loginloader } from "./pages/Login";
import Signup, { signuploader } from "./pages/Signup";
import SingleBlog, { SingleBlogloader } from "./pages/SingleBlog";
import CreateBlog, { createblogloader } from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog, { checkiflogin } from "./Components/Blog";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Seetings , {settingloader} from "./pages/Seetings";
import ProfileUpdate from "./pages/ProfileUpdate";
import AuthdatacontextProvider from "./contexts/UserContext";
import UpdateBlog from "./pages/UpdateBlog";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layots />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} loader={loginloader} />
      <Route path="/signup" element={<Signup />} loader={signuploader} />
      <Route
        path="/create"
        element={<CreateBlog />}
        loader={createblogloader}
      />
      <Route path="my-blogs" element={<MyBlogs />} />
      <Route path="blog" element={<Blog />} loader={checkiflogin} />
      <Route path="/forgottenpassword" element={<ForgottenPassword />} />
      <Route path="/password-reset/:id/:token" element={<ResetPassword />} />

      <Route path="/:id" element={<SingleBlog />} loader={SingleBlogloader} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/settings" element={<Seetings />}  loader={settingloader}/>
      <Route path="/profileupdate" element={<ProfileUpdate />} />
      <Route path="/update/:id" element={<UpdateBlog/>}/>

      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <ToastContainer autoClose={1500} newestOnTop={true} />

      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
