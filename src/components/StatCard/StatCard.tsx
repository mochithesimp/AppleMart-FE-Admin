import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import "./StatCard.css";

interface StatCardProps {
  name: string;
  icon: LucideIcon;
  value: string;
  color: string;
}


const StatCard: React.FC<StatCardProps> = ({ name, icon: Icon, value, color }) => {

  
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-content">
        <span className="stat-label">
          <Icon size={20} className="stat-icon" style={{ color }} />
          {name}
        </span>
        <p className="stat-value">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
