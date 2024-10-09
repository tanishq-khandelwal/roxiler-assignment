import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import CombinedData from "./CombinedData";
import Statistics from "./Statistics";

const StatisticsPage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-around">
          <div className="h-[28rem] w-full md:w-[48%] border border-gray-300 border-solid shadow-md rounded-lg mb-4 md:mb-0">
            <BarChart />
          </div>

          <div className="h-[28rem] w-full md:w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="mt-10 pb-10">
        <div className="flex flex-col md:flex-row justify-around">
          <div className="h-[28rem] w-full md:w-[48%] border border-gray-300 border-solid shadow-md rounded-lg mb-4 md:mb-0">
            <CombinedData />
          </div>
          <div className="h-[28rem] w-full md:w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
