import { motion } from "framer-motion";
import Header from "../../../components/Header/Header";
import StatCard from "../../../components/StatCard/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../../../components/Sales/SalesOverviewChart";
import SalesByCategoryChart from "../../../components/Sales/SalesByCategoryChart";
import DailySalesTrend from "../../../components/Sales/DailySalesTrend";
import "./SalesPage.css";

interface SalesStats {
  totalRevenue: string;
  averageOrderValue: string;
  conversionRate: string;
  salesGrowth: string;
}

const salesStats: SalesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

const SalesPage: React.FC = () => {
  return (
    <div className="SalesPage-container">
      <Header title="Sales" />

      <main className="SalesPage-content">
        {/* SALES STATS */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Revenue" icon={DollarSign} value={salesStats.totalRevenue} color="#6366F1" />
          <StatCard name="Avg. Order Value" icon={ShoppingCart} value={salesStats.averageOrderValue} color="#10B981" />
          <StatCard name="Conversion Rate" icon={TrendingUp} value={salesStats.conversionRate} color="#F59E0B" />
          <StatCard name="Sales Growth" icon={CreditCard} value={salesStats.salesGrowth} color="#EF4444" />
        </motion.div>
        
        <SalesOverviewChart />

        <div className="charts-grid">
          <SalesByCategoryChart />
          <DailySalesTrend />
        </div>
      </main>
    </div>
  );
};

export default SalesPage;
