import React from "react";
import SearchBar from "./../components/SearchBar";
import { Plus } from "lucide-react";

const Header: React.FC = () => {
  const handleSearch = (value: string) => {
    // Implement search functionality
    console.log("Searching for:", value);
  };

  return (
    <div className="px-6 py-4 bg-white ">
      <div className="flex flex-col items-start space-y-8">
        <div>
          <h1 className="text-4xl font-semibold mb-4">Customers' List</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-gray-800">Customers' List</span>
          </div>
        </div>
        <div className="flex justify-between w-full ">
          <button className=" flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-whit border rounded-md  hover:bg-blue-100">
            <Plus size={16} />
            NEW CUSTOMER
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Header;
