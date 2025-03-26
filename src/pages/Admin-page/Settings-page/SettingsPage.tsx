import "./SettingsPage.css"; 
import Header from "../../../components/Header/Header";
// import ConnectedAccounts from "../../../components/Settings/ConnectedAccounts";
// import DangerZone from "../../../components/Settings/DangerZone";
// import Notifications from "../../../components/Settings/Notifications";
import Profile from "../../../components/Settings/Profile";
// import Security from "../../../components/Settings/Security";

const SettingsPage: React.FC = () => {
	return (
		<div className='settings-container'>
			<Header title='Settings' />
			<main className='settings-content'>
				<Profile />
				{/* <Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone /> */}
			</main>
		</div>
	);
};

export default SettingsPage;
