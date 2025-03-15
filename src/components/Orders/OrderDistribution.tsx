import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./OrderDistribution.css";

const orderStatusData = [
	{ name: "Pending", value: 30 },
	{ name: "Processing", value: 45 },
	{ name: "Shipped", value: 60 },
	{ name: "Delivered", value: 120 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FED766", "#2AB7CA"];

const OrderDistribution: React.FC = () => {
	return (
		<motion.div
			className='order-distribution-container'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='order-distribution-title'>Order Status Distribution</h2>
			<div className='order-chart-container'>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={orderStatusData}
							cx='50%'
							cy='50%'
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{orderStatusData.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default OrderDistribution;
