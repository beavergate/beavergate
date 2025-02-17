import { FC, useRef, useState, ChangeEvent, useCallback } from "react";
import { Button } from "@/ui/button";
import { ChevronDown, FilterIcon, Import, Search } from "lucide-react";
import { Input } from "@/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import UploadDialog from "@/components/UploadDialog";
import { UploadDialogHandle } from "@/components/UploadDialog/types";
import { Property } from "modules/Properties/types";
import { useGetPropertiesByUserId } from "@/hooks/property";
import debounce from "lodash/debounce";

type Props = {
  data: Property[];
};

const CustomHeader: FC<Props> = ({ data }) => {
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId();
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Track search query
  const uploadComponentRef = useRef<UploadDialogHandle>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      await getPropertiesByUserId({ q: query });
    }, 300), // Delay of 300ms
    []
  );

  // Handle search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Call debounced search function
  };

  return (
    <>
      <UploadDialog
        ref={uploadComponentRef}
        files={files}
        onFilesChange={setFiles}
      />

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black">
            <FilterIcon />
          </Button>
          <Button
            onClick={() => uploadComponentRef.current?.open()}
            className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black"
          >
            <Import />
          </Button>
        </div>

        <div className="relative flex items-center w-[600px] border rounded-md">
          <Search className="absolute left-3 text-gray-500" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
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
    </>
  );
};

export default CustomHeader;
