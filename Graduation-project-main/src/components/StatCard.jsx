import React from 'react';
import clsx from 'clsx';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
    const isPositive = trend === 'up';

    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={clsx("p-3 rounded-xl", colorStyles[color] || colorStyles.blue)}>
                    <Icon size={24} />
                </div>
                <div className={clsx(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                )}>
                    {isPositive ? '+' : ''}{change}
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
        </div>
    );
};

export default StatCard;
