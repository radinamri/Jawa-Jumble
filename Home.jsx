import AddNewWare from "../Wares/AddNewWare";
import { Link } from "react-router-dom";
import "../Home/home.css";
import { useEffect, useState } from "react";
import WaresList from "../Wares/WaresList";
import axios from "axios";

export default function Home() {
  const [waresList, setWaresList] = useState([]);
  const [userAuth, setUserAuth] = useState(false);

  const loadWares = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/wares");
      setWaresList(data);
    } catch (error) {
      console.error("Error loading wares:", error);
    }
  };

  useEffect(() => {
    loadWares();
    const userAuthData = JSON.parse(localStorage.getItem("userAuth"));
    setUserAuth(userAuthData && userAuthData.username && userAuthData.password);
  }, []);

  const logout = () => {
    localStorage.setItem("userAuth", null);
    setUserAuth(false);
  };

  return (
    <div className="home-general-wrapper">
      <div className="home-navbar-wrapper">
        <div className="home-logo-wrapper">Jawa Jumble</div>
        <div className="home-links-wrapper">
          {userAuth ? (
            <>
              <Link className="profile-links" to="/wares">
                <div>Wares</div>
              </Link>
              <Link className="wares-links" to="/users">
                <div>Profile</div>
              </Link>
              <Link onClick={logout} className="home-links" to="/">
                <div>Logout</div>
              </Link>
            </>
          ) : (
            <>
              <Link className="home-links" to="/login">
                <div>Login</div>
              </Link>
              <Link className="home-links" to="/registration">
                <div>Sign up</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="home-main-wrapper">
        <WaresList list={waresList} />
      </div>
    </div>
  );
}
