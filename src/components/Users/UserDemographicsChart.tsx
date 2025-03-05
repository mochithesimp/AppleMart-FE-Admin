import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import "./UserDemographicsChart.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const userDemographicsData = [
    { name: "18-24", value: 20 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 },
];

const UserDemographicsChart = () => {
    return (
        <motion.div
            className='chart-container'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <h2 className='chart-title'>User Demographics</h2>
            <div className='chart-wrapper'>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={userDemographicsData}
                            cx='50%'
                            cy='50%'
                            outerRadius={100}
                            dataKey='value'
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {userDemographicsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            wrapperStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.9)",
                                color: "#e5e7eb",
                                border: "1px solid #4B5563",
                                padding: "8px",
                                borderRadius: "6px"
                            }}
                        />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
export default UserDemographicsChart;
