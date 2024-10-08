import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [month, setMonth] = useState('3');
    const [chartData, setChartData] = useState(null);
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
            fetchPieChartData();
        }
    }, [month]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const fetchPieChartData = async () => {
        try {
            const response = await axiosInstance.get(`/pie-chart?month=${month}`);
            const data = response.data;

            // Prepare chart data
            const labels = data.map(item => item._id); // Extract category names
            const values = data.map(item => item.count); // Extract counts

            const formattedData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: values,
                        backgroundColor: [
                            'rgb(237,28,36)', 
                            'rgb(238,65,36)',
                            'rgb(246,146,33)',
                            'rgb(63,8,58)', 
                            'rgb(27,39,85)',
                            'rgba(30, 30, 30, 0.8)',  
                            'rgba(69, 90, 100, 0.8)',   
                            'rgba(0, 0, 0, 0.8)',       
                        ],
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1,
                    },

                ],
            };

            setChartData(formattedData);
            setError('');
        } catch (err) {
            setError('Failed to fetch pie chart data');
        }
    };

    return (
        <div className="p-4">
            <div className='flex'>
                <h2 className="text-2xl font-bold mb-4">
                    Pie Chart Stats - {months.find(m => m.value === month)?.label || 'N/A'}
                </h2>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="border p-2 ml-[17rem] rounded-lg border-solid border-gray-300 shadow-xl"
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
            {chartData && (
                <div className="mt-4 h-[20rem] w-[30rem] flex justify-center items-center ml-[5rem]">
                    <Pie data={chartData} />
                </div>
            )}
        </div>
    );
};

export default PieChart;
