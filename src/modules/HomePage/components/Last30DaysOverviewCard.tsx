// components/Last30DaysOverviewCard.tsx
import { FC } from "react";
import { ChevronRight, DollarSign, CreditCard } from "lucide-react";

const Last30DaysOverviewCard: FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-[8px] p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between  items-start mb-4">
        <h4 className="text-[24px] font-semibold">Last 30 Days</h4>
        <div className="flex items-center space-x-1 text-gray-400">
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          <h3 className="text-[34px] font-semibold text-green-500">$36,840</h3>
          <h6 className="text-[14px] text-grayText-0">paid invoices</h6>
        </div>
        <div className="flex gap-4">
          <div className="border-r " />
          <div>
            <h3 className="text-[34px] font-semibold text-red-500">$8,420</h3>
            <h6 className="text-[14px] text-grayText-0">open invoices</h6>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="flex items-center font-semibold bg-[#EBECF6] text-purple-0 px-4 py-2 rounded-md">
          <DollarSign className="w-4 h-4 mr-2" />
          Receive Payments
        </button>
        <a
          href="#"
          className="text-purple-0 text-[14px] font-semibold flex items-center"
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default Last30DaysOverviewCard;
