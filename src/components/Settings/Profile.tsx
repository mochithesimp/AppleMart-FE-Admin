import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import "./Profile.css";
import { Link } from "react-router-dom";
import noface from "../../assets/NoFace.jpg";

const Profile = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <SettingSection icon={User} title="User Profile">
      <div className="profile-container">
        <img
          src={noface}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3 className="profile-name">Admin</h3>
          <p className="profile-email">admin@example.com</p>
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
