import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Registration-Login/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuthString = localStorage.getItem("userAuth");
    if (userAuthString) {
      try {
        const userAuth = JSON.parse(userAuthString);
        if (userAuth && userAuth.username && userAuth.password) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error parsing userAuth:", error);
      }
    }
  }, []);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setShowError(true);
      return;
    }
    try {
      const response = await axios.get("http://localhost:8000/login");
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        console.log("Login successful:", user);
        localStorage.setItem("userAuth", JSON.stringify(user));
        navigate("/");
      } else {
        console.error("Invalid username or password");
        clearForm();
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setShowError(false);
  };
  return (
    <div className="login-general-wrapper">
      <div className="login-title">Hello There, Welcome to Jawa Jumble!</div>
      <div className="login-ad">
        "Step into the galaxy of Jawa Jumble, where your second-hand treasures
        find their new homes!<br></br>Join the scavenger's squad today and let
        the Force of sales be with you!"
      </div>
      <div className="login-inputs-wrapper">
        <input
          className="login-inputs"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          className="login-inputs"
          placeholder="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        {showError && (
          <div className="login-error-message">
            PLEASE FILL USERNAME AND PASSWORD FIELDS!
          </div>
        )}
        <div className="login-sign-up">
          Don't have an account?
          <Link className="login-links" to="/registration">
            <div>Sign up</div>
          </Link>
        </div>
        <div className="login-sign-up">
          <Link className="login-links" to="/">
            <div>Back to Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
