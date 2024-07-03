// components/SubHeader.tsx
import { FC } from "react";
import {
  LayoutGrid,
  DollarSign,
  FileText,
  MessageSquare,
  CheckSquare,
  MoreHorizontal,
  Search,
} from "lucide-react";

const SubHeader: FC = () => {
  return (
    <div className="bg-white text-gray-700  p-2 border-b border-gray-200">
      <div className="flex items-center justify-between container max-w-[1600px]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <LayoutGrid className="text-[#343D9B]" />
            <span className="ml-1 text-[#343D9B]">Dashboard</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="text-gray-500" />
            <span className="ml-1">Accounting</span>
          </div>
          <div className="flex items-center">
            <FileText className="text-gray-500" />
            <span className="ml-1">Reports</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="text-gray-500" />
            <span className="ml-1">Messages</span>
          </div>
          <div className="flex items-center">
            <CheckSquare className="text-gray-500" />
            <span className="ml-1">Tasks</span>
          </div>
          <MoreHorizontal className="text-gray-500" />
        </div>
        <div className="flex items-center">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search anything here..."
            className="ml-2 px-2 py-1 bg-gray-100 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
