import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import CombinedData from "./CombinedData";
import Statistics from "./Statistics";

const StatisticsPage = () => {
  return (
    <div>
      <div className=" mt-10 ">
        <div className="flex justify-around">
          <div className="h-[28rem] w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            {/* <div className="items-center justify-center flex">Bar Chart</div> */}
            <BarChart/>
          </div>

          <div className="h-[28rem] w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            <PieChart/>
          </div>
        </div>
      </div>

      <div className=" mt-10 pb-10">
        <div className="flex justify-around">
          <div className="h-[28rem] w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            <CombinedData/>
          </div>
          <div className="h-[28rem] w-[48%] border border-gray-300 border-solid shadow-md rounded-lg">
            <Statistics/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatisticsPage;
