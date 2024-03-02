import { Link } from "react-router-dom";
import "../Users/profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [userAuth, setUserAuth] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phonenumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userAuthData = JSON.parse(localStorage.getItem("userAuth"));
    setUserAuth(userAuthData && userAuthData.username && userAuthData.password);

    if (userAuthData && userAuthData.username && userAuthData.password) {
      fetchUserData(userAuthData.username);
    }
  }, []);

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8000/users`);
      const user = response.data.find((user) => user.username === username);
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/users/${userData.user_id}`,
        userData
      );
      fetchUserData(userData.username);
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error.message);
      alert("Failed to update user information. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/users/${userData.user_id}`);
        localStorage.removeItem("userAuth");
        setUserAuth(false);
        alert("Your account has been deleted successfully!");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting user account:", error.message);
        alert("Failed to delete user account. Please try again later.");
      }
    }
  };

  const logout = () => {
    localStorage.setItem("userAuth", null);
    setUserAuth(false);
  };

  return (
    <div className="profile-general-wrapper">
      <div className="profile-navbar-wrapper">
        <div className="profile-logo-wrapper">Jawa Jumble</div>
        <div className="profile-links-wrapper">
          {userAuth ? (
            <>
              <Link className="profile-links" to="/">
                <div>Home</div>
              </Link>
              <Link className="profile-links" to="/wares">
                <div>Wares</div>
              </Link>
              <Link className="home-links" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="profile-main-wrapper">
        <div className="profile-inputs-wrapper">
          <h2>Edit Profile</h2>
          <input
            className="profile-inputs"
            placeholder="Full Name"
            type="text"
            name="fullname"
            value={userData.fullname}
            onChange={handleInputChange}
          />
          <input
            className="profile-inputs"
            placeholder="Username"
            type="text"
            name="username"
            value={userData.username}
            readOnly
          />
          <div className="password-wrapper">
            <input
              className="profile-inputs"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <button
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            className="profile-inputs"
            placeholder="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <input
            className="profile-inputs"
            placeholder="Phone Number"
            type="text"
            name="phonenumber"
            value={userData.phonenumber}
            onChange={handleInputChange}
          />
          <button
            className="profile-button"
            onClick={handleSubmit}
            type="submit"
          >
            Save Changes
          </button>
          <div className="profile-delete-account">
            <Link
              className="profile-delete-account-link"
              onClick={handleDeleteAccount}
              to="/"
            >
              <div>Delete account?</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
