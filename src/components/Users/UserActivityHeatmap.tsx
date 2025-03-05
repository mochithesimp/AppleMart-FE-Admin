import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import "./UserActivityHeatmap.css";

const userActivityData = [
	{ name: "Mon", "0-4": 20, "4-8": 40, "8-12": 60, "12-16": 80, "16-20": 100, "20-24": 30 },
	{ name: "Tue", "0-4": 30, "4-8": 50, "8-12": 70, "12-16": 90, "16-20": 110, "20-24": 40 },
	{ name: "Wed", "0-4": 40, "4-8": 60, "8-12": 80, "12-16": 100, "16-20": 120, "20-24": 50 },
	{ name: "Thu", "0-4": 50, "4-8": 70, "8-12": 90, "12-16": 110, "16-20": 130, "20-24": 60 },
	{ name: "Fri", "0-4": 60, "4-8": 80, "8-12": 100, "12-16": 120, "16-20": 140, "20-24": 70 },
	{ name: "Sat", "0-4": 70, "4-8": 90, "8-12": 110, "12-16": 130, "16-20": 150, "20-24": 80 },
	{ name: "Sun", "0-4": 80, "4-8": 100, "8-12": 120, "12-16": 140, "16-20": 160, "20-24": 90 },
];

const UserActivityHeatmap = () => {
	return (
		<motion.div
			className='heatmap-container'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='heatmap-title'>User Activity Heatmap</h2>
			<div className='heatmap-wrapper'>
				<ResponsiveContainer>
					<BarChart data={userActivityData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						{Object.keys(userActivityData[0]).slice(1).map((key, index) => (
							<Bar key={key} dataKey={key} stackId='a' fill={['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'][index % 6]} />
						))}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default UserActivityHeatmap;
