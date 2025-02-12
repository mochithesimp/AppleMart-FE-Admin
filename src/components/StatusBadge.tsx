// src/components/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-600';
            case 'Blocked':
                return 'bg-gray-100 text-gray-600';
            case 'Rejected':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;