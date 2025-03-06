import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import "./DangerZone.css";

const DangerZone = () => {
	return (
		<motion.div
			className='danger-zone'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='danger-zone__header'>
				<Trash2 className='danger-zone__icon' size={24} />
				<h2 className='danger-zone__title'>Danger Zone</h2>
			</div>
			<p className='danger-zone__description'>
				Permanently delete your account and all of your content.
			</p>
			<button className='danger-zone__button'>Delete Account</button>
		</motion.div>
	);
};

export default DangerZone;
