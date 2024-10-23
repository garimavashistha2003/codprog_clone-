import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useAuth } from "../contexts/AuthContextProvider";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function DropdownItemTagsExample() {
  const { auth, setAuth } = useAuth();
  return (
    <DropdownButton
      id="dropdown-item-button"
      title="Blogs"
      variant="primary"
      className="mt-2"
    >
      <Dropdown.Header>Blogs</Dropdown.Header>
      <Dropdown.Item as={Link} to="/create" className="px-3 py-2">
        <i className="fas fa-plus-circle mr-2"></i>
        <span className="ml-2">Create Blog</span>
      </Dropdown.Item>
      {auth?.access_token && (
        <Dropdown.Item as={Link} to="/my-blogs" className="px-3 py-2">
          <i className="fas fa-user mr-2"></i>
          <span className="ml-2">My Blogs</span>
        </Dropdown.Item>
      )}
      <Dropdown.Item as={Link} to="/all-blogs" className="px-3 py-2">
        <i className="fas fa-list mr-2"></i>
        <span className="ml-2">All Blogs</span>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownItemTagsExample;
