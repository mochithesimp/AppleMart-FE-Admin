import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import "./SalesOverviewChart.css";

const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

const SalesOverviewChart: React.FC = () => {
	return (
		<motion.div
			className='sales-overview'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='sales-overview__title'>Sales Overview</h2>
			<div className='sales-overview__wrapper'>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="name" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }} />
						<Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={3} dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 2 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
