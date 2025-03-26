
import { motion } from "framer-motion";
import Header from "../../../components/Header/Header";
import UsersTable from "../../../components/Users/UsersTable";
import UserGrowthChart from "../../../components/Users/UserGrowthChart";
import UserActivityHeatmap from "../../../components/Users/UserActivityHeatmap";
import UserDemographicsChart from "../../../components/Users/UserDemographicsChart";
import "./UsersPage.css";

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
