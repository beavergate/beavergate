import { Button } from "@/ui/button";
import { ChevronDown, FilterIcon, Import, Search } from "lucide-react";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export const customHeader = (
  <div className="flex justify-between mb-4">
    <div className="flex items-center gap-4">
      <Button className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black">
        <FilterIcon />
      </Button>
      <Button className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black">
        <Import />
      </Button>
    </div>

    <div className="relative flex items-center w-[600px] border rounded-md ">
      <Search className="absolute left-3 text-gray-500" />
      <Input
        type="text"
        placeholder="Search by Title, Counterparty, ID, Business User, Tags"
        className="pl-10 border-none focus:ring-0 dark:bg-gray-800 dark:text-white focus-visible:outline-none"
      />
    </div>

    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center space-x-2 border bg-white text-black border-gray-300 hover:bg-slate-100 hover:border-black rounded-md px-4 py-2">
            <span>Generate Report</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onSelect={() => console.log("PDF Report")}>
            PDF Report
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Excel Report")}>
            Excel Report
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("CSV Report")}>
            CSV Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
