import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../../components/Header/Header";
import StatCard from "../../../components/StatCard/StatCard";
import UsersTable from "../../../components/Users/UsersTable";
import UserGrowthChart from "../../../components/Users/UserGrowthChart";
import UserActivityHeatmap from "../../../components/Users/UserActivityHeatmap";
import UserDemographicsChart from "../../../components/Users/UserDemographicsChart";
import "./UsersPage.css";

interface UserStats {
    totalUsers: number;
    newUsersToday: number;
    activeUsers: number;
    churnRate: string;
}

const userStats: UserStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};

const UsersPage: React.FC = () => {
    return (
        <div className="Users-container">
            <Header title="Users" />
            <main className="Users-content">
                {/* STATS */}
                <motion.div
                    className="stats-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Users" icon={UsersIcon} value={userStats.totalUsers.toLocaleString()} color="#6366F1" />
                    <StatCard name="New Users Today" icon={UserPlus} value={userStats.newUsersToday.toLocaleString()} color="#10B981" />
                    <StatCard name="Active Users" icon={UserCheck} value={userStats.activeUsers.toLocaleString()} color="#F59E0B" />
                    <StatCard name="Churn Rate" icon={UserX} value={userStats.churnRate} color="#EF4444" />
                </motion.div>

                <UsersTable />

                {/* USER CHARTS */}
                <div className="charts-grid">
                    <UserGrowthChart />
                    <UserActivityHeatmap />
                    <div className="lg:col-span-2">
                        <UserDemographicsChart />
                    </div>
                </div>
            </main>
        </div>

    );
};

export default UsersPage;
