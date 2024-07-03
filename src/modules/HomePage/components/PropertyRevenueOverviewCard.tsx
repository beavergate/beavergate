// components/PropertyRevenueOverviewCard.tsx
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronRight, Download } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PropertyRevenueOverviewCard: FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Expense",
        data: [5, 2, 7, 3, 5, 6, 2, 0],
        backgroundColor: "#F17825",
      },
      {
        label: "Income",
        data: [10, 15, 25, 35, 20, 30, 40, 0],
        backgroundColor: "#4149AC",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-[8px] p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-semibold">Property Revenue Overview</h4>
          <h6 className="text-[14px] text-grayText-0">
            Show overview Jan 2019 - Des 2019{" "}
            <a href="#" className="text-purple-0">
              Detailed Stats
            </a>
          </h6>
        </div>
        <button className="flex items-center font-semibold bg-[#EBECF6] text-purple-0 px-4 py-2 rounded-md">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          <a
            href="#"
            className="text-purple-500 border-b-2 border-purple-500 py-2"
          >
            Overview
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 py-2">
            Leasing
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 py-2">
            Conversion
          </a>
        </nav>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <Bar data={data} options={options} />
        </div>
        <div className="mt-4 flex flex-col justify-evenly gap-3">
          <div className=" p-4 w-[350px] h-[120px] rounded border border-purple-300 flex justify-between cursor-pointer">
            <div>
              <p className="text-[34px] font-semibold text-purple-0">$46,690</p>
              <p className="text-[24px] text-gray-600">
                Money in <span className="text-green-500">5.8%</span>
              </p>
            </div>
            <div>
              <ChevronRight className="text-purple-0" />
            </div>
          </div>

          <div className=" p-4 rounded border w-[350px] h-[120px] border-orange-200 flex justify-between cursor-pointer">
            <div>
              <p className="text-[34px] font-semibold text-orange-0">$8,940</p>
              <p className="text-[24px] text-gray-600">
                Money out <span className="text-red-500">26.4%</span>
              </p>
            </div>
            <div>
              <ChevronRight className="text-orange-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRevenueOverviewCard;
