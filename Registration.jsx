import { Link, Navigate } from "react-router-dom";
import "../Registration-Login/registration.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const onAdd = async (userData) => {
    try {
      await axios.post("http://localhost:8000/users", userData);
      console.log("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  const handleRegistration = () => {
    if (
      fullname === "" ||
      username === "" ||
      password === "" ||
      email === "" ||
      phonenumber === ""
    ) {
      setShowError(true);
      return;
    }
    onAdd({ fullname, username, password, email, phonenumber });
    clearForm();
  };

  const clearForm = () => {
    setFullname("");
    setUsername("");
    setPassword("");
    setEmail("");
    setPhonenumber("");
    setShowError(false);
  };

  return (
    <div className="registration-general-wrapper">
      <div className="registration-title">
        Hello There, Welcome to Jawa Jumble!
      </div>
      <div className="registration-ad">
        "Step into the galaxy of Jawa Jumble, where your second-hand treasures
        find their new homes!<br></br>Join the scavenger's squad today and let
        the Force of sales be with you!"
      </div>
      <div className="registration-inputs-wrapper">
        <input
          className="registration-inputs"
          placeholder="Full Name"
          type="text"
          name="fullname"
          value={fullname}
          onChange={(event) => setFullname(event.target.value)}
        ></input>
        <input
          className="registration-inputs"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          className="registration-inputs"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          className="registration-inputs"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          className="registration-inputs"
          placeholder="Phone Number"
          type="text"
          name="phonenumber"
          value={phonenumber}
          onChange={(event) => setPhonenumber(event.target.value)}
        ></input>
        <button className="registration-button" onClick={handleRegistration}>
          Sign up
        </button>
        {showError && (
          <div className="registration-error-message">
            PLEASE FILL ALL THE FIELDS ABOVE!
          </div>
        )}
        <div className="registration-login">
          Have an account?
          <Link className="registration-links" to="/login">
            <div>Login</div>
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
