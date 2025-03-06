import React from "react";
import "./ToggleSwitch.css";

interface ToggleSwitchProps {
	label: string;
	isOn: boolean;
	onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isOn, onToggle }) => {
	return (
		<div className="toggle-switch">
			<span className="toggle-label">{label}</span>
			<button className={`toggle-button ${isOn ? "on" : "off"}`} onClick={onToggle}>
				<span className={`toggle-indicator ${isOn ? "on" : "off"}`} />
			</button>
		</div>
	);
};

export default ToggleSwitch;
