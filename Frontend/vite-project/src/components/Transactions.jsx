// src/components/Transactions.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('January');
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        try {
            const response = await axiosInstance.get(`/transactions?month=${month}`);
            setTransactions(response.data);
        } catch (err) {
            setError('Failed to fetch transactions');
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [month]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions for {month}</h1>
            <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="Enter month"
                className="border p-2 mb-4"
            />
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>{transaction.title}: {transaction.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
