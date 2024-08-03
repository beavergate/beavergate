"use client";

import { FC, useState } from "react";

import ProfileDropdown from "./components/ProfileDropdown";
import Link from "next/link";
import InputPopover from "../InputPopover";
import {
  useCreateFullProperty,
  useCreateProperty,
  useGetPropertiesByUserId,
} from "@/hooks/property";
import { useGlobalState } from "@/context/GlobalStateContext";

const Header: FC = () => {
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();

  const [createFullProperty] = useCreateFullProperty();
  const [getPropertiesByUserId, { loading }] = useGetPropertiesByUserId();

  const [files, setFiles] = useState<File[]>([]);

  const handleData = async (data: any) => {
    try {
      const createPromises = data.map((item: any) => createFullProperty(item));
      const responses = await Promise.all(createPromises);
      const newProperties = responses.map((response: any) => response.data);
      if (newProperties.length > 0) {
        getPropertiesByUserId({ page: 1 });
      }
    } catch (e) {
      console.error("Error creating property:", e);
    }
  };

  return (
    <header className="bg-[#121924] p-4 shadow ">
      <div className="container max-w-[1600px] flex justify-between p-0">
        <div className="flex items-center gap-3">
          <Link href="/">
            {/* <Image src="/logo.png" alt="Clova Logo" width={40} height={40} /> */}
            <h5 className="text-white">BeaverGate</h5>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          <InputPopover
            onFilesChange={(files) => setFiles(files)}
            files={files}
            handleData={handleData}
            type="all"
          />
          {/* <Mail size={20} color="#ffffff" className="cursor-pointer" />
          <Bell size={20} color="#ffffff" className="cursor-pointer" /> */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
