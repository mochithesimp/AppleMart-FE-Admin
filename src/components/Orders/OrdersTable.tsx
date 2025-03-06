import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import "./OrdersTable.css";

interface Order {
	id: string;
	customer: string;
	total: number;
	status: string;
	date: string;
}

const orderData: Order[] = [
	{ id: "ORD001", customer: "John Doe", total: 235.4, status: "Delivered", date: "2023-07-01" },
	{ id: "ORD002", customer: "Jane Smith", total: 412.0, status: "Processing", date: "2023-07-02" },
	{ id: "ORD003", customer: "Bob Johnson", total: 162.5, status: "Shipped", date: "2023-07-03" },
	{ id: "ORD004", customer: "Alice Brown", total: 750.2, status: "Pending", date: "2023-07-04" },
	{ id: "ORD005", customer: "Charlie Wilson", total: 95.8, status: "Delivered", date: "2023-07-05" },
	{ id: "ORD006", customer: "Eva Martinez", total: 310.75, status: "Processing", date: "2023-07-06" },
	{ id: "ORD007", customer: "David Lee", total: 528.9, status: "Shipped", date: "2023-07-07" },
	{ id: "ORD008", customer: "Grace Taylor", total: 189.6, status: "Delivered", date: "2023-07-08" },
];

const OrdersTable: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredOrders, setFilteredOrders] = useState<Order[]>(orderData);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = orderData.filter(
			(order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='orders-container'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='orders-header'>
				<h2 className='orders-title'>Order List</h2>
				<div className='search-container'>
					<input
						type='text'
						placeholder='Search orders...'
						className='search-input'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='search-icon' size={18} />
				</div>
			</div>

			<div className='table-container'>
				<table className='orders-table'>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Status</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{filteredOrders.map((order) => (
							<motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
								<td>{order.id}</td>
								<td>{order.customer}</td>
								<td>${order.total.toFixed(2)}</td>
								<td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
								<td>{order.date}</td>
								<td>
									<button className='action-button'>
										<Eye size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default OrdersTable;
