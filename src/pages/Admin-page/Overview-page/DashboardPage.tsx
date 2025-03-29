import React from "react";
import Header from "../../../components/Header/Header";
import { UserCheck, UserPlus, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../../../components/StatCard/StatCard";

import "./DashboardPage.css";
import SalesOverviewChart from "../../../components/Charts/SalesOverviewChart/SalesOverviewChart";
import CategoryDistributionChart from "../../../components/Charts/CategoryDistributionChart/CategoryDistributionChart";
// import SalesChannelChart from "../../../components/Charts/SalesChannelChart/SalesChannelChart";


import { useEffect, useState } from "react";
import { getStatCardRevenue, getStatTopProduct, getStatCardUser } from "../../../apiServices/StatCardServices/statCardServices";

const DashboardPage: React.FC = () => {

  const[totalUser, setTotalUser] = useState(Number);
  const[totalRevenue, setTotalRevenue] = useState(Number);
  const[topSelling, setTopSelling] = useState(Number);
  // const[totalCustomer, setTotalCustomer] = useState(Number);

  useEffect(() => {
      const fetchData = async () => {
        const result = await getStatCardUser();
        if (result) {
          setTotalUser(result);
        } else {
          console.error("Data not found or invalid response structure");
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
        const fetchData = async () => {
          const revenue = await getStatCardRevenue();
          if (typeof revenue === "number") {
            setTotalRevenue(revenue);
          } else {
            console.error("Invalid response:", revenue);
          }
        };
        fetchData();
      }, []);
    
      useEffect(() => {
          const fetchData = async () => {
            const result = await getStatTopProduct();
            if (result && result.totalCount) {
              setTopSelling(result.totalCount);
            } else {
              console.error("Data not found or invalid response structure");
            }
          };
          fetchData();
        }, []);
      
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
             <StatCard name="Total Users" icon={UsersIcon} value={totalUser.toLocaleString()} color="#6366F1" />
                    <StatCard name="Total Sale" icon={UserPlus} value={totalRevenue.toLocaleString()} color="#10B981" />
                    <StatCard name="Total Product" icon={UserCheck} value={topSelling.toLocaleString()} color="#F59E0B" />
                    {/* <StatCard name="Top Customer" icon={UserX} value={totalCustomer.toLocaleString()} color="#EF4444" /> */}
        </motion.div>
        {/* Charts */}
        <div className="grid">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          {/* <div className="lg:col-span-2">
            <SalesChannelChart />
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;