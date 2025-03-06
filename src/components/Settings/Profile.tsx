import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import"./Profile.css";

const Profile = () => {
	return (
		<SettingSection icon={User} title="User Profile">
			<div className="profile-container">
				<img
					src="https://randomuser.me/api/portraits/men/3.jpg"
					alt="User Avatar"
					className="profile-avatar"
				/>
				<div className="profile-info">
					<h3 className="profile-name">John Doe</h3>
					<p className="profile-email">john.doe@example.com</p>
				</div>
			</div>

			<button className="profile-edit-btn">
				Edit Profile
			</button>
		</SettingSection>
	);
};

export default Profile;
