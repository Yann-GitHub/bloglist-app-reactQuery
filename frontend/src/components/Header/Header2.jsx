import { Link } from "react-router-dom";
import { useHeader } from "./useHeader.hook";

export const Header = () => {
  const { username, handleLogout } = useHeader();

  return (
    <div className="header">
      {username && (
        <nav className="navbar">
          <div className="nav-links">
            <Link className="nav-link" to="/">
              Blogs
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </div>
          <div className="logout">
            <span>{`👨🏻 ${username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
          </div>
        </nav>
      )}
    </div>
  );
};
