import React from 'react';

const ChartCard = ({ title, children, action }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {action && (
                    <div>{action}</div>
                )}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
