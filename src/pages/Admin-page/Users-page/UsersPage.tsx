import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../../components/Header/Header";
import StatCard from "../../../components/StatCard/StatCard";
import UsersTable from "../../../components/Users/UsersTable";
import UserGrowthChart from "../../../components/Users/UserGrowthChart";
import UserActivityHeatmap from "../../../components/Users/UserActivityHeatmap";
import UserDemographicsChart from "../../../components/Users/UserDemographicsChart";
import "./UsersPage.css";
import { useEffect, useState } from "react";
import { getStatCardCustomers, getStatCardRevenue, getStatCardTopSale, getStatCardUser } from "../../../apiServices/StatCardServices/statCardServices";





const UsersPage: React.FC = () => {

  const[totalUser, setTotalUser] = useState(Number);
  const[totalRevenue, setTotalRevenue] = useState(Number);
  const[topSelling, setTopSelling] = useState(Number);
  const[totalCustomer, setTotalCustomer] = useState(Number);

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
          const result = await getStatCardRevenue();
          if (result) {
            setTotalRevenue(result);
          } else {
            console.error("Data not found or invalid response structure");
          }
        };
        fetchData();
      }, []);
    
      useEffect(() => {
          const fetchData = async () => {
            const result = await getStatCardTopSale();
            if (result && result.$values) {
              setTopSelling(result.$values);
            } else {
              console.error("Data not found or invalid response structure");
            }
          };
          fetchData();
        }, []);
      
        useEffect(() => {
            const fetchData = async () => {
              const result = await getStatCardCustomers();
              if (result && result.$values) {
                setTotalCustomer(result.$values);
              } else {
                console.error("Data not found or invalid response structure");
              }
            };
            fetchData();
          }, []);
        
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
                    <StatCard name="Total Users" icon={UsersIcon} value={totalUser.toLocaleString()} color="#6366F1" />
                    <StatCard name="New Users Today" icon={UserPlus} value={totalRevenue.toLocaleString()} color="#10B981" />
                    <StatCard name="Active Users" icon={UserCheck} value={topSelling.toLocaleString()} color="#F59E0B" />
                    <StatCard name="Churn Rate" icon={UserX} value={totalCustomer.toLocaleString()} color="#EF4444" />
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
