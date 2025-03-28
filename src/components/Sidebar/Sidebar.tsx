import React from "react";
import { Users, BarChart2, Settings, ShoppingBag, ShoppingCart, Menu, FileText, LucideProps } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarItem {
    name: string;
    icon: React.ComponentType<LucideProps>;
    color: string;
    path: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
    { name: "Dashboard", icon: BarChart2, color: "#6366f1", path: "/admin" },
    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", path: "/admin/products" },
    { name: "Blogs", icon: FileText, color: "#F43F5E", path: "/admin/blogs" }, // Sửa lỗi thiếu icon và màu
    { name: "Users", icon: Users, color: "#EC4899", path: "/admin/users" },
    // { name: "Sales", icon: DollarSign, color: "#10B981", path: "/admin/sales" },
    { name: "Orders", icon: ShoppingCart, color: "#F59E0B", path: "/admin/orders" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", path: "/admin/settings" },
];

const Sidebar: React.FC<{ isOpen: boolean; setIsOpen: (val: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    return (
        <motion.div
            className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
            animate={{ width: isOpen ? 256 : 80 }}
            style={{ backgroundColor: "#1f2937" }}
        >
            <div className="sidebar-container">
                <motion.button
                    className="sidebar-toggle"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={24} />
                </motion.button>

                <nav className="sidebar-menu">
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.path} to={item.path}>
                            <motion.div className="sidebar-item">
                                <item.icon size={20} style={{ color: item.color }} />
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            className="sidebar-text"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;
