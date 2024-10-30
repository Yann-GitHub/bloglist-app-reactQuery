import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-wrapper">
      <img className="error-img" src="/error.png" alt="error" />
      <h1 style={{ margin: 0 }}>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go back to Home</button>
    </div>
  );
};

export default Error;
