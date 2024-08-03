"use client";  

import { FC, useState } from "react";
import { Bell, Mail } from "lucide-react";

import ProfileDropdown from "./components/ProfileDropdown";
import Link from "next/link";
import InputPopover from "../InputPopover";
import { useGeocodeAddresses } from "@/hooks/geocode";
import { useCreateFullProperty, useCreateProperty } from "@/hooks/property";
import { useGlobalState } from "@/context/GlobalStateContext";

const Header: FC = () => {
  const {
    state: { properties },
    actions: { setProperties },
  } = useGlobalState();

  const [geocodeAddresses] = useGeocodeAddresses();
  const [createFullProperty] = useCreateFullProperty();
  const [createProperty] = useCreateProperty();

  const [files, setFiles] = useState<File[]>([]);

  const fetchGeocodeData = async (addresses: any) => {
    try {
      const response = await geocodeAddresses(addresses);
      if (response.status === 200) {
        const geocodedData = response.data;
        // Handle the geocoded data
      } else {
        console.error("Failed to fetch geocode data");
      }
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };
  const handleData = async (data: any) => {
    try {
      // const updatedData = await fetchGeocodeData(
      //   data.map((d: any) => d.property)
      // );
      const createPromises = data.map((item: any) => createFullProperty(item));
      const responses = await Promise.all(createPromises);
      const newProperties = responses.map((response: any) => response.data);
      setProperties([...properties, ...newProperties]);
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
