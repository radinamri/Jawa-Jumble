import AddNewWare from "./AddNewWare";
import WaresList from "./WaresList";
import { Link } from "react-router-dom";
import "../Wares/wares.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Wares() {
  const [userAuth, setUserAuth] = useState(false);
  const [userWares, setUserWares] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userAuthData = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuthData && userAuthData.username && userAuthData.password) {
      setUserAuth(true);
      setUserId(userAuthData.user_id);
      fetchUserWares(userAuthData.username);
    }
  }, []);

  const fetchUserWares = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/wares/${username}`
      );
      setUserWares(response.data);
    } catch (error) {
      console.error("Error fetching user's wares:", error.message);
    }
  };

  const logout = () => {
    localStorage.setItem("userAuth", null);
    setUserAuth(false);
    setUserWares([]);
  };

  const handleAddNewWare = (newWare) => {
    setUserWares([...userWares, newWare]);
  };

  return (
    <div className="wares-general-wrapper">
      <div className="wares-navbar-wrapper">
        <div className="wares-logo-wrapper">Jawa Jumble</div>
        <div className="wares-links-wrapper">
          {userAuth ? (
            <>
              <Link className="profile-links" to="/">
                <div>Home</div>
              </Link>
              <Link className="profile-links" to="/users">
                <div>Profile</div>
              </Link>
              <Link onClick={logout} className="home-links" to="/">
                <div>Logout</div>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="wares-main-wrapper">
        {userAuth && <AddNewWare onAdd={handleAddNewWare} />}
        <WaresList list={userWares} />
      </div>
    </div>
  );
}
