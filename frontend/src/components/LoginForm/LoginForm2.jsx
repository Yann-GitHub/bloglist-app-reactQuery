import { useLoginForm } from "./useLoginForm.hook";

export const LoginForm = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLoginForm();

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          Username{" "}
          <input
            className="input-login"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            className="input-login"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <br />
    </>
  );
};
