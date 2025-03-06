import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import"./Security.css";

const Security = () => {
	const [twoFactor, setTwoFactor] = useState(false);

	return (
		<SettingSection icon={Lock} title="Security Settings">
			<ToggleSwitch
				label="Two-Factor Authentication"
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>
			<div className="security-actions">
				<button className="security-btn">Change Password</button>
			</div>
		</SettingSection>
	);
};

export default Security;
