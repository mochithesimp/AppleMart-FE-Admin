import React from 'react';
import { LayoutDashboard, Users, BarChart2, MessageSquare, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-black h-screen fixed left-0 top-0 border-r">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-[#E7E9EA]">AppleMart</h1>
            </div>

            <nav className="px-4">
                <div className="px-5 space-y-2">
                    <Link to="/" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] rounded-lg hover:bg-[#363A3F]">
                        <LayoutDashboard size={20} />
                        <span>DASHBOARD</span>
                    </Link>
                    <Link to="/customers" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] bg-[#363A3F] rounded-lg">
                        <Users size={20} />
                        <span>CUSTOMERS</span>
                    </Link>
                    <Link to="/analytics" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] rounded-lg hover:bg-[#363A3F]">
                        <BarChart2 size={20} />
                        <span>ANALYTICS</span>
                    </Link>
                </div>

                <div className="mt-8">
                    <p className="px-2 text-xs font-semibold text-gray-400 mb-4">SETTINGS</p>
                    <div className="px-5 space-y-2">
                        <Link to="/messages" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] rounded-lg hover:bg-[#363A3F]">
                            <MessageSquare size={20} />
                            <span>MESSAGES</span>
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] rounded-lg hover:bg-[#363A3F]">
                            <Settings size={20} />
                            <span>SETTING</span>
                        </Link>
                        <Link to="/help" className="flex items-center gap-3 px-2 py-2 text-[#B8BBBE] rounded-lg hover:bg-[#363A3F]">
                            <HelpCircle size={20} />
                            <span>HELP CENTRE</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar; 