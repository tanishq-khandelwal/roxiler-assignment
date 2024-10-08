import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';

const Statistics = () => {
    const [month, setMonth] = useState('3'); // Default month is March
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    useEffect(() => {
        if (month) {
            fetchStatistics(); // Fetch statistics whenever the month changes
        }
    }, [month]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const fetchStatistics = async () => {
        try {
            const response = await axiosInstance.get(`/statistics?month=${month}`);
            setData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch statistics');
            setData(null); // Reset data on error
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg  ">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Statistics - {months.find(m => m.value === month)?.label || 'N/A'}
            </h2>
            <div className="mb-6">
                <label className="block mb-2 text-lg text-gray-700">Select Month</label>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="border p-3 w-full rounded-lg border-gray-300 bg-white text-gray-700  focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="">Select Month</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Total Sale</h3>
                        <p className="text-3xl font-bold text-gray-800">{data.totalSaleAmount}</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Total Sold Items</h3>
                        <p className="text-3xl font-bold text-gray-800">{data.totalSoldItems}</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Total Not Sold Items</h3>
                        <p className="text-3xl font-bold text-gray-800">{data.totalNotSoldItems}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;
