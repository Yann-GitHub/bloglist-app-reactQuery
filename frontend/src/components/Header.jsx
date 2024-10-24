import { Link } from "react-router-dom";
import { useUserDispatch, useUserValue } from "../contexts/UserContext";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import blogService from "../services/blogs";

const Header = () => {
  const { user, username, toker } = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

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
      {/* <h1>Blog App</h1> */}
    </div>
  );
};

export default Header;
