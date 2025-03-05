import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import "./UsersTable.css";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

const userData: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Customer", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

const UsersTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(userData);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(
            userData.filter((user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term))
        );
    };

    return (
        <motion.div className="users-table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="table-header">
                <h2>Users</h2>
                <div className="search-box">
                    <input type="text" placeholder="Search users..." value={searchTerm} onChange={handleSearch} />
                    <Search className="search-icon" size={18} />
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <td>
                                    <div className="user-info">
                                        <div className="avatar">{user.name.charAt(0)}</div>
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td className="role">{user.role}</td>
                                <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
                                <td className="actions">
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersTable;
