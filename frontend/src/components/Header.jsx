import { Link } from "react-router-dom";
import { useUserDispatch, useUserValue } from "../contexts/UserContext";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, username, token } = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    window.localStorage.clear();
    blogService.setToken(null);
    notificationDispatch({
      type: "CREATE",
      payload: `Logged out. Goodbye!👋🏼`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 4000);
    navigate("/");
  };

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

export default Header;
