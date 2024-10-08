import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
// import ReactJson from 'react-json-view'; // Import the JSON view component

const CombinedData = () => {
    const [month, setMonth] = useState('3'); // Default month set to March
    const [data, setData] = useState({}); // Initialize as an empty object
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
        fetchCombinedData();
    }, [month]); // Fetch data whenever the month changes

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const fetchCombinedData = async () => {
        if (!month) return; // Prevent fetching if no month is selected
        try {
            const response = await axiosInstance.get(`/combined-data?month=${month}`);
            setData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch combined data');
            setData({}); // Reset data on error
        }
    };

    return (
        <div className="p-4">
            <div className="flex">
                <h2 className="text-2xl font-bold mb-4">
                    Combined Data - {months.find(m => m.value === month)?.label || 'N/A'}
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
            {data && Object.keys(data).length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold">JSON Data:</h3>
                    {/* <ReactJson
                        src={data}
                        theme="monokai" // Set the theme to dark
                        style={{ padding: '10px', background: '#282c34' }} // Customize background and padding
                        collapsed={true} // Expand all by default
                        enableClipboard={false} // Allow copying JSON
                    /> */}
                </div>
            )}
        </div>
    );
};

export default CombinedData;
