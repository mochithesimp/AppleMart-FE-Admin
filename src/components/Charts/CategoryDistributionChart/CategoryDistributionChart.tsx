import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./CategoryDistributionChart.css";

const categoryData = [
	{ name: "Điện thoại", value: 4500 },
	{ name: "Laptop", value: 3200 },
	{ name: "Phụ kiện", value: 2800 },
	{ name: "Smartwatch", value: 2100 },
	{ name: "Tablet", value: 1900 },
];

const COLORS: string[] = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart: React.FC = () => {
	return (
		<motion.div
			className='category-chart'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='category-chart__title'>Category Distribution</h2>
			<div className='category-chart__wrapper'>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
							{categoryData.map((_, index) => (
								<Cell key={index} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default CategoryDistributionChart;
