import React from "react";
import Header from "../../../components/Header/Header";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../../../components/StatCard/StatCard";

import "./DashboardPage.css";
import SalesOverviewChart from "../../../components/Charts/SalesOverviewChart/SalesOverviewChart";
import CategoryDistributionChart from "../../../components/Charts/CategoryDistributionChart/CategoryDistributionChart";
import SalesChannelChart from "../../../components/Charts/SalesChannelChart/SalesChannelChart";

const DashboardPage: React.FC = () => {
  return (
    
    <div className="dashboard-container">
      <Header title="Overview" />
      <main className="dashboard-content" >
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Sales" icon={Zap} value="$12,345" color="#6366F1" />
          <StatCard name="New Users" icon={Users} value="1,234" color="#8B5CF6" />
          <StatCard name="Total Products" icon={ShoppingBag} value="567" color="#EC4899" />
          <StatCard name="Conversion Rate" icon={BarChart2} value="12.5%" color="#10B981" />
        </motion.div>
        {/* Charts */}
        <div className="grid">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <div className="lg:col-span-2">
            <SalesChannelChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;