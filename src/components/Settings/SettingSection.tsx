import { motion } from "framer-motion";
import { ReactNode, ComponentType } from "react";
import"./SettingSection.css";

interface IconProps {
	className?: string;
	size?: number;
}

interface SettingSectionProps {
	icon: ComponentType<IconProps>; 
	title: string;
	children: ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ icon: Icon, title, children }) => {
	return (
		<motion.div
			className="settings-section-container"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="section-header">
				<Icon className="section-icon" size={24} />
				<h2 className="section-title">{title}</h2>
			</div>
			<div className="section-description">{children}</div>
		</motion.div>
	);
};

export default SettingSection;
