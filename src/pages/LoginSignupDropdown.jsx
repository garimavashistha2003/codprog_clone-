// import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
// function LoginSigndropdown() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Login
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">
//           <button>
//             <Link to="login">Login</Link>
//           </button>
//         </Dropdown.Item>
//         <Dropdown.Item href="#/action-2">
//           <button>
//             <Link to="signup">Sign Up</Link>
//           </button>
//         </Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// export default LoginSigndropdown;

import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

function LoginSigndropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="btn-sm btn-block">
        <i className="fas fa-user"></i> Login/Sign Up
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-right" style={{ minWidth: '100px' }}>
        <Dropdown.Item>
          <Link to="login" className="btn btn-sm btn-primary btn-block">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="signup" className="btn btn-sm btn-success btn-block">
            <i className="fas fa-user-plus"></i> Sign Up
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-3" className="text-center">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LoginSigndropdown;
