import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import "./Profile.css";
import { Link } from "react-router-dom";
import noface from "../../assets/NoFace.jpg";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { getUserId } from "../../apiServices/UserServices/userServices";

export interface IUser {
  role: string;
  name: string;
  email: string;
}
const Profile = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const token = localStorage.getItem("token");
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          console.error("Token not found");
          return;
        }
        const userIdFromToken = getUserIdFromToken(token) || "";
        const userData = await getUserId(userIdFromToken);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user", error);
        throw new Error("User not found");
      }
    };

    fetchUser();
  }, [token]);

  return (
    <SettingSection icon={User} title="User Profile">
      <div className="profile-container">
        <img
          src={noface}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* <button className="profile-edit-btn">Edit Profile</button> */}

      <Link
        to="/login"
        onClick={handleLogout}
        className="profile-logout-btn"
      >
        Log Out
      </Link>
    </SettingSection>
  );
};

export default Profile;
