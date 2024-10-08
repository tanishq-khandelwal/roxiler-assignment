import React, { useEffect, useState } from "react";
import axiosInstance from "./helper/axiosInstance";

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("3");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Initial per page value is 10
  const [totalTransactions, setTotalTransactions] = useState(0);

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
    fetchTransactions();
  }, [search, month, page, perPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get(
        "/transactions",
        {
          params: { search, month, page, perPage },
        }
      );
      setTransactions(response.data.transactions);
      setTotalTransactions(response.data.total);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPage(1); // Reset to first page on month change
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value)); // Change number of transactions per page
    setPage(1); // Reset to first page when changing per page
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalTransactions / perPage);

  const trimText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded-lg  border-solid border-gray-300 shadow-xl w-[30rem] ml-[12rem]"
        />

        <div className="flex justify-evenly items-center">
            <div>

           
        <select
          value={month}
          onChange={handleMonthChange}
          className="border p-2 ml-2 rounded-lg  border-solid border-gray-300 shadow-xl"
        >
          <option value="">Select Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        </div>

        <div>

        {/* Dropdown for selecting number of transactions per page */}
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="border p-2 ml-[23rem] rounded-lg  border-solid border-gray-300 shadow-xl"
        >
          <option value={5}>Per Page 5</option>
          <option value={10}>Per Page 10</option>
          <option value={15}>Per Page 15</option>
          <option value={20}>Per Page 20</option>
        </select>
        </div> 
      </div>

      </div>

      <div className="border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden mx-auto w-3/4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">ID</th>
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">Title</th>
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">Description</th>
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">Price</th>
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">Category</th>
              <th className="border-b border-r border-gray-300 px-4 py-1 text-left">Sold</th>
              <th className="border-b border-gray-300 px-4 py-1 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100 transition duration-200">
                <td className="border-b border-r border-gray-300 px-4 py-3 ">{transaction.id}</td>
                <td className="border-b border-r border-gray-300 px-4 py-3 font-sans">{trimText(transaction.title, 5)}</td>
                <td className="border-b border-r border-gray-300 px-4 py-3 font-sans">{trimText(transaction.description, 15)}</td>
                <td className="border-b border-r border-gray-300 px-4 py-3 font-sans">{transaction.price}</td>
                <td className="border-b border-r border-gray-300 px-4 py-3 font-bold capitalize font-sans">{transaction.category}</td>
                <td className="border-b border-r border-gray-300 px-4 py-3">
                  {transaction.sold ? "Yes" : "No"}
                </td>
                <td className="border-b border-gray-300 px-4 py-1">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="w-12 h-12 object-cover "
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
          className="border px-4 py-2 rounded-lg  border-solid border-gray-300 shadow-xl "
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-2 ">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() =>
            handlePageChange(page < totalPages ? page + 1 : totalPages)
          }
          className="border px-4 py-2 rounded-lg  border-solid border-gray-300 shadow-xl "
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
