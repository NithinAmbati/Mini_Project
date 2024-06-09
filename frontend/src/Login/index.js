import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const loginSuccess = () => {
    navigate("/");
    window.location.reload(); // Reload the page
  };

  const loginFailure = () => {
    alert("Incorrect UserDetails");
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    console.log(userDetails);
    const url = "https://mini-project-nine-rho.vercel.app/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const { jwtToken } = await response.json();
        console.log(jwtToken);
        Cookie.set("jwt_token", jwtToken, { expires: 1 });
        loginSuccess();
      } else {
        console.log("Login failed");
        loginFailure();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={submitBtn}>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="USERNAME"
          onChange={onChangeUsername}
          className="username"
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="PASSWORD"
          onChange={onChangePassword}
          className="password"
        />
        <button className="btn btn-dark mt-3 mb-3 w-25" type="submit">
          Login
        </button>
        <p>
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
