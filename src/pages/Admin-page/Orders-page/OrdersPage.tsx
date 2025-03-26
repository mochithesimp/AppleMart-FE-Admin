import Header from "../../../components/Header/Header";
import DailyOrders from "../../../components/Orders/DailyOrders";
import OrderDistribution from "../../../components/Orders/OrderDistribution";
import OrdersTable from "../../../components/Orders/OrdersTable";
import "./OrdersPage.css";

const OrdersPage: React.FC = () => {
  return (
    <div className="Orders-container">
      <Header title="Orders" />
      <main className="Orders-content">
    
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