import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
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
            fetchBarChartData();
        }
    }, [month]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const fetchBarChartData = async () => {
        try {
            const response = await axiosInstance.get(`/bar-chart?month=${month}`);
            const data = response.data;

            // Define the predefined price categories
            const categories = [
                "0-100", "100-200", "200-300", "300-400", "400-500",
                "500-600", "600-700", "700-800", "800-900", "900+"
            ];

            // Function to map the API response to the predefined categories
            const getCategory = (priceRange) => {
                const [low, high] = priceRange.split('-').map(Number);
                if (low >= 0 && high <= 100) return "0-100";
                if (low >= 100 && high <= 200) return "100-200";
                if (low >= 200 && high <= 300) return "200-300";
                if (low >= 300 && high <= 400) return "300-400";
                if (low >= 400 && high <= 500) return "400-500";
                if (low >= 500 && high <= 600) return "500-600";
                if (low >= 600 && high <= 700) return "600-700";
                if (low >= 700 && high <= 800) return "700-800";
                if (low >= 800 && high <= 900) return "800-900";
                return "900+";
            };

            // Map the API data to the chart's categories
            const values = categories.map(cat => {
                const matchingData = data
                    .filter(item => getCategory(item.priceRange) === cat)
                    .reduce((sum, item) => sum + item.count, 0);
                return matchingData;
            });

            // Prepare chart data
            const formattedData = {
                labels: categories,
                datasets: [
                    {
                        label: 'Number of Items',
                        data: values,
                        backgroundColor: 'rgb(0,0,247)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            setChartData(formattedData);
            setError('');
        } catch (err) {
            setError('Failed to fetch bar chart data');
        }
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                min: 0,
                max: Math.max(...(chartData?.datasets[0].data || [3])) + 0.5, // Dynamically adjust max Y value based on data
                ticks: {
                    stepSize: 0.5 // Show intervals of 0.5 on the Y axis
                },
                title: {
                    display: true,
                    text: 'Number of Items'
                }
            }
        }
    };

    return (
        <div className="p-4">
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                <h2 className="text-2xl font-bold mb-4 md:mb-0">
                    Bar Chart Stats - {months.find(m => m.value === month)?.label || 'N/A'}
                </h2>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="border p-2 mt-2 md:mt-0 rounded-lg border-solid border-gray-300 shadow-xl w-full md:w-auto"
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
                <div className="mt-4">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default BarChart;
