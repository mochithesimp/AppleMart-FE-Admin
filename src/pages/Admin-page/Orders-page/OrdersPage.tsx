import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../../components/Header/Header";
import StatCard from "../../../components/StatCard/StatCard";
import DailyOrders from "../../../components/Orders/DailyOrders";
import OrderDistribution from "../../../components/Orders/OrderDistribution";
import OrdersTable from "../../../components/Orders/OrdersTable";
import "./OrdersPage.css";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersPage: React.FC = () => {
  return (
    <div className="Orders-container">
      <Header title="Orders" />

      <main className="Orders-content">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Orders" icon={ShoppingBag} value={orderStats.totalOrders} color="#6366F1" />
          <StatCard name="Pending Orders" icon={Clock} value={orderStats.pendingOrders} color="#F59E0B" />
          <StatCard name="Completed Orders" icon={CheckCircle} value={orderStats.completedOrders} color="#10B981" />
          <StatCard name="Total Revenue" icon={DollarSign} value={orderStats.totalRevenue} color="#EF4444" />
        </motion.div>

        <div className="charts-grid">
          <DailyOrders />
          <OrderDistribution />
        </div>

        <OrdersTable />
      </main>
    </div>
  );
};

export default OrdersPage;