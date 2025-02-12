import Header from './../components/Header';
import CustomerTable from './../components/CustomerTable';
import Pagination from './../components/Pagination';
import Sidebar from './../components/Sidebar';
import TopBar from './../components/TopBar';
import { Customer } from './../types/types';
import { useState } from 'react';

const AdminPage = () => {
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      fullName: "Vu Le",
      status: "Approved",
      email: "vule@gmail.com",
      dateOfBirth: "11/29/2003"
    },
    {
      id: 2,
      fullName: "Vu Le",
      status: "Approved",
      email: "vule@gmail.com",
      dateOfBirth: "11/29/2003"
    },

  ]);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <div className="pt-16">
          <Header />
          <div className="px-6">
            <CustomerTable customers={customers} />
            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;