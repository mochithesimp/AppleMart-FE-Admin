import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import "./DailyOrders.css";

interface OrderData {
	date: string;
	orders: number;
}

const dailyOrdersData: OrderData[] = [
	{ date: "07/01", orders: 45 },
	{ date: "07/02", orders: 52 },
	{ date: "07/03", orders: 49 },
	{ date: "07/04", orders: 60 },
	{ date: "07/05", orders: 55 },
	{ date: "07/06", orders: 58 },
	{ date: "07/07", orders: 62 },
];

const DailyOrders: React.FC = () => {
	return (
		<motion.div
			className="daily-orders-container"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="daily-orders-title">Daily Orders</h2>

			<div className="chart-wrapper">
				<ResponsiveContainer>
					<LineChart data={dailyOrdersData}>
						<CartesianGrid strokeDasharray="3 3" className="grid-stroke" />
						<XAxis dataKey="date" className="axis-stroke" />
						<YAxis className="axis-stroke" />
						<Tooltip
							contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type="monotone" dataKey="orders" stroke="#8B5CF6" strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DailyOrders;