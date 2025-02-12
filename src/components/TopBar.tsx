import React from 'react';
import { Bell, Mail } from 'lucide-react';

const TopBar: React.FC = () => {
    return (
        <div className="h-16 bg-white border-b flex items-center justify-end px-6 fixed top-0 right-0 left-64">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <Mail size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 ml-2">
                    <img
                        src="https://th.bing.com/th/id/OIP.LNRC6nsntA0asaxljqjifQHaFj?rs=1&pid=ImgDetMain"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">Anh Vu le</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar; 