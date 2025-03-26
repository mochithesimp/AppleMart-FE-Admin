import Header from "../../../components/Header/Header";
import SalesOverviewChart from "../../../components/Sales/SalesOverviewChart";
import SalesByCategoryChart from "../../../components/Sales/SalesByCategoryChart";
import DailySalesTrend from "../../../components/Sales/DailySalesTrend";
import "./SalesPage.css";

const SalesPage: React.FC = () => {
  return (
    <div className="SalesPage-container">
      <Header title="Sales" />

      <main className="SalesPage-content">
        {/* SALES STATS */}
        
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
