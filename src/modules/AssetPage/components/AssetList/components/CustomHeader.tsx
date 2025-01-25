"use client";

import { FC, useRef, useState, ChangeEvent, useCallback } from "react";
import { Button } from "@/ui/button";
import { ChevronDown, FilterIcon, Import, Search } from "lucide-react";
import { Input } from "@/ui/input";
import { UploadDialogHandle } from "@/components/UploadDialog/types";
import { Asset } from "modules/AssetPage/types";
import { useGetAllAssets } from "@/hooks/asset";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation"; // Updated import for App Router

type Props = {
  data: Asset[];
};

const CustomHeader: FC<Props> = ({ data }) => {
  const [getAllAssets, { loading }] = useGetAllAssets();
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const uploadComponentRef = useRef<UploadDialogHandle>(null);
  const router = useRouter(); // Now using App Router's useRouter

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      await getAllAssets(); // Pass the query to fetch filtered assets
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleCreateAsset = () => {
    router.push("/assets/create"); // Using App Router's push method
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        {/* Left section: Filter and Import */}
        <div className="flex items-center gap-4">
          <Button className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black">
            <FilterIcon />
          </Button>
          <Button className="bg-white text-black border border-solid rounded-md hover:bg-slate-100 hover:border-black">
            <Import />
          </Button>
        </div>

        {/* Center section: Search bar */}
        <div className="relative flex items-center w-[600px] border rounded-md">
          <Search className="absolute left-3 text-gray-500" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Asset Name, Tag, Serial No, Model No"
            className="pl-10 border-none focus:ring-0 dark:bg-gray-800 dark:text-white focus-visible:outline-none"
          />
        </div>

        <Button
          onClick={handleCreateAsset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Asset
        </Button>
      </div>
    </>
  );
};

export default CustomHeader;
